const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
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

MessageSchema.statics.toAPI = (doc) => ({
  user: doc.user,
  message: doc.message,
  createdDate: doc.date,
});

const MessageModel = mongoose.model('Message', MessageSchema);
module.exports = MessageModel;
