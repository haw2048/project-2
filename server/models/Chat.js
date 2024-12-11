const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  user1: {
    type: String,
    required: true,
    trim: true,
  },
  user2: {
    type: String,
    required: true,
    trim: true,
  },
  messages: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Message',
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

ChatSchema.statics.toAPI = (doc) => ({
  users: doc.users,
  messages: doc.messages,
  createdDate: doc.date,
});

const ChatModel = mongoose.model('Chat', ChatSchema);
module.exports = ChatModel;




