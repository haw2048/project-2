const mongoose = require('mongoose');

const subSchema1 = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true,
  },
});

const subSchema2 = new mongoose.Schema({
  message: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Message',
  },
});

const ServerSchema = new mongoose.Schema({
  users: {
    type: [subSchema1],
  },
  channels: {
    type: [subSchema2],
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

ServerSchema.statics.toAPI = (doc) => ({
  users: doc.users,
  messages: doc.messages,
  owner: doc.owner,
  createdDate: doc.date,
});

const ServerModel = mongoose.model('Server', ServerSchema);
module.exports = ServerModel;
