const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getChats', mid.requiresLogin, controllers.Chat.getChats);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/chat', mid.requiresLogin, controllers.Chat.messagePage);
  app.post('/chat', mid.requiresLogin, controllers.Chat.makeChat);

  app.get('/server', mid.requiresLogin, controllers.Server.serverPage);
  app.post('/server', mid.requiresLogin, controllers.Server.makeServer);

  app.get('/message', mid.requiresLogin, controllers.Message.messagePage);
  app.post('/message', mid.requiresLogin, controllers.Message.makeChat);
  


  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
