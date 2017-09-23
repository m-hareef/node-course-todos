var {User} = require('./../models/user');

var authenticate = ((req, res, next) => { //The routes below will not get called until next is called
  var token = req.header('x-auth');

  //call function to findByToken in user.js
  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(); //this will return the same code sending 401 as below catch(e)
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send(); //401 code is for unauthorized
  });
});

module.exports = {authenticate};
