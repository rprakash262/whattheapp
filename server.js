const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
var http = require('http');
const socket = require('socket.io');
// const fileUpload = require('express-fileupload');
// const crypto = require('crypto');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const methodOverride = require('method-override');
// const multer = require('multer');

const Conversation = require('./models/Conversation');

const options={
  cors: true,
  // origins: ["https://arcane-wildwood-43524.herokuapp.com"],
  origins: ["http://localhost:5000"],
}

const app = express();

const api = require('./routes/api');

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose
  .connect(db)
  .then(() => { console.log('Connected to database') })
  .catch(err => console.error('Error while connecting to database====>>>>>>>>>>>>>', err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// use routes
app.use('/', api);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// initialize IO
const server = http.createServer(app);
// const server = http.Server(app);
var io = socket(server, options);
io.listen(server);

// run when  client connects
io.on('connection', socket => {
  console.log('USER CONNECTED.............');

  socket.on('send-msg', async ({ selectedChatId: chatId, userId: authorId, textMsg: message, time, msgId }) => {
    const newMessage = {
      author: authorId,
      message,
      time,
      status: 'sent'
    };

    console.log(newMessage, '==>>')

    try {
      await Conversation.updateOne({ chatId }, { $addToSet: { conversation: newMessage } });

      newMessage._id = msgId;
      newMessage.status = 'delivered';

      socket.broadcast.emit('receive-msg', { newMessage, chatId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, result: 'Something went wrong' });
    }
  })

	socket.on("disconnect", () => {
	    console.log('USER DISCONNECTED............');
	});
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server is running on port ${port}`));