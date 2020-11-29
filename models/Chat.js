const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	userOne: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	userTwo: {
		type: Schema.Types.ObjectId,
		required: true,
	},
});

const Chat = mongoose.model('chats', ChatSchema);

module.exports = Chat;
