const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const jwt_decode = require('jwt-decode');
const fs = require('fs');
const path = require('path');

const User = require('../../models/User');
const Chat = require('../../models/Chat');
const Conversation = require('../../models/Conversation');
const keys = require('../../config/keys');
const upload = require('../../utils/upload');

router.post('/register-user', async (req, res) => {
  const { name, phone, pin } = req.body;

  try {
    const userFound = await User.findOne({ phone });

    if (userFound) {
      return res.status(200).json({ result: 'Phone number already registered', success: false });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pin, salt, async (error, hash) => {
        if (err) throw error;
        
        try {
          const newUser = new User({
            name,
            phone,
            pin: hash,
          });

          const response = await newUser.save();

          const user = {
            userId: response._id,
            name: response.name,
            phone: response.phone,
            image: response.image,
          };

          jwt.sign(user, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.status(200).json({ success: true, result: 'Bearer ' + token });
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, result: 'Something went wrong' });
  }
});

router.post('/login-user', async (req, res) => {
  const { phone, pin } = req.body;

  try {
    const response = await User.findOne({ phone });

    if (response) {
      const newUser = {
        userId: response._id,
        name: response.name,
        phone: response.phone,
        image: response.image,
      };

      const isMatch = await bcrypt.compare(pin, response.pin);

      if (isMatch) {
        jwt.sign(newUser, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.status(200).json({ success: true, result: 'Bearer ' + token });
        })
      } else {
        res.status(200).json({ result: 'Incorrect PIN', success: false });
      }
    } else {
      res.status(200).json({ result: 'No user found with this number', success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, result: 'Something went wrong' });
  }
});

router.get('/get-users', async (req, res) => {
  try {
    const users = await User.find();

    const transformedUsers = users.map(user => ({
      id: user._id,
      phone: user.phone,
      name: user.name,
      image: user.image,
    }));

    res.status(200).json({ result: transformedUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: 'Something went wrong' });
  }
});

router.post('/get-user-details', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { userIds } = req.body;

  try {
    const userDetails = await User.find({ _id: { $in: userIds } });

    const transformedUserDetails = userDetails.map(detail => ({
      userId: detail._id,
      phone: detail.phone,
      name: detail.name,
      image: detail.image,
    }));

    res.status(200).json({ result: transformedUserDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: 'Something went wrong' });
  }
});

router.post('/get-friends', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { userId } = req.body;

  try {
    const response = await Chat.find({ $or: [ { userOne: userId }, {userTwo: userId } ] });
    
    const transformedRes = response.map(d => ({
      chatId: d._id,
      userOne: d.userOne == userId ? d.userOne : d.userTwo,
      userTwo: d.userOne == userId ? d.userTwo : d.userOne,
    }));

    res.status(200).json({ success: true, result: transformedRes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, result: 'Something went wrong' });
  }
});

router.post('/start-chat', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { userOne, userTwo } = req.body;

  try {
    const chat = await Chat.findOne({ $or: [ { userOne, userTwo }, { userOne: userTwo, userTwo: userOne } ] });
    
    if (chat) return res.status(200).json({ success: false, result: 'Already exist' });

    const newChat = new Chat({
      userOne,
      userTwo,
    });

    const response = await newChat.save();

    const newConversation = new Conversation({
      chatId: response._id,
      conversation: [],
    });

    const conv = await newConversation.save();

    const transformedRes = {
      chatId: response._id,
      userOne: response.userOne,
      userTwo: response.userTwo,
    };

    res.status(200).json({ success: true, result: transformedRes });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: 'Something went wrong' });
  }
});

router.post('/search-numbers', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { num } = req.body;
  const { headers } = req;
  const { authorization: token } = headers

  try {
    const users = await User.find({ phone: { $regex : `.*${num}.*` }});
    
    const user = jwt_decode(token)
    const { userId } = user;
    const filteredUsers = users.filter(d => d.id !== userId);

    const transformedUsers = filteredUsers.map(user => ({
      userId: user._id,
      name: user.name,
      phone: user.phone,
      image: user.image,
    }));

    res.status(200).json({ success: true, result: transformedUsers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: 'Something went wrong' });
  }
});

router.post('/get-chats', async (req, res) => {
  const { userId } = req.body;

  try {
    const chats = await Chat.find({ userOne: userId });

    const transformedChats = chats.map(chat => ({
      id: chat._id,
      userOne: chat.userOne,
      userTwo: chat.userTwo,
    }));

    res.status(200).json({ result: transformedChats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMsg: 'Something went wrong' });
  }
});

router.post('/get-conversation', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { chatId } = req.body;
  
  try {
    const chat = await Conversation.findOne({ chatId });

    const transformedConversation = {
      conversationId: chat._id,
      chatId: chat.chatId,
      conversation: chat.conversation,
    };

    res.status(200).json({ success: true, result: transformedConversation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, result: 'Something went wrong' });
  }
});

router.post('/post-conversation', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { chatId, authorId, message, time } = req.body;

  const newMessage = {
    author: authorId,
    message,
    time,
  };

  try {
    const response = await Conversation.updateOne({ chatId: chatId }, { $addToSet: { conversation: newMessage } });
    console.log(response);
    res.status(200).json({ success: true, result: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, result: 'Something went wrong' });
  }
});

// router.post('/upload-profile-image', (req, res) => {
//   if (req.files === null) {
//     return res.status(200).json({ success: false, result: 'No file found' });
//   }

//   const file = req.files.file;

//   console.log(file)

//   const dirPath = path.join(__dirname, `../../client/public/profileImage/${file.name}`)

//   file.mv(dirPath, err => {
//     if (err) {
//       return console.error(err);
//     }

//     const result = {
//       fileName: file.name,
//       filePath: `/profileImage/${file.name}`
//     };

//     res.status(200).json({ success: true, result });
//   })
// });

router.post('/upload-profile-image', upload.single('file'), (req, res) => {
  
  console.log('==>>')
  res.json({  file: 'file' });
});

module.exports = router;