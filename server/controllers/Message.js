const models = require('../models');

const { Account, Chat } = models;


const messagePage = async (req, res) => res.render('app');

const getChats = async (req, res) => {
  try {
    const query = {
      $or: [
        { user1: req.session.account.username },
        { user2: req.session.account.username },
      ],
    };

    const docs = await Chat.find(query).select('user1 user2 messages').lean().exec();

    return res.json({ chats: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retriving chats' });
  }
};

const getName = async (req, res) => {
    const docs = await Chat.findOne(query).select('user1 user2 messages').lean().exec();
}

const makeChat = async (req, res) => {
  if (!req.body.user1) {
    return res.status(400).json({ error: 'Other user is required' });
  }
  const query = { username: req.body.user1 };
  console.log(query);
  if (await Account.findOne(query) == null) {
    return res.status(400).json({ error: 'Other user does not exist' });
  }

  const chatData = {
    user1: req.session.account.username,
    user2: req.body.user1,
    owner: req.session.account._id,
  };

  try {
    const newChat = new Chat(chatData);
    await newChat.save();
    return res.status(201).json({ user1: newChat.user1, user2: newChat.user2 });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Chat already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making new chat!' });
  }
};

// const deleteDomo = async (req, res) => {
//   if (!req.body.name || !req.body.age || !req.body.food) {
//     return res.status(400).json({ error: 'Both name, age, and food are required!' });
//   }

//   const domoData = {
//     name: req.body.name,
//     age: req.body.age,
//     food: req.body.food,
//     owner: req.session.account._id,
//   };

//   try {
//     await Domo.deleteOne(domoData);

//     return res.json({ redirect: '/maker' });
//   } catch (err) {
//     console.log(err);
//     if (err.code === 11000) {
//       return res.status(400).json({ error: 'Domo already exists!' });
//     }
//     return res.status(500).json({ error: 'An error occured making domo!' });
//   }
// };

module.exports = {
  messagePage,
  makeChat,
  getChats,
  // deleteDomo,
};
