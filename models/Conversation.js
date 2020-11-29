const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
	chatId: {
		type: Schema.Types.ObjectId,
		ref: 'chats',
	},
	conversation: [{
		author: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		time: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			default: 'sent'
		},
	}],
});

const Conversation = mongoose.model('conversation', ConversationSchema);

module.exports = Conversation;
