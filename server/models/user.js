const mongoose = require('mongoose')
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//Create a schema for Users table to include tokens and hash for password encrption
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },

  password: {
    type: String,
    required: true,
    minlength:6
  },

  //Below is a nested document or array  with fields access and token
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//create a method to override a mongoose method to prevent JSON returning  passwords and tokens
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();  //override the toObject which is responsible for returning the Object

  return _.pick(userObject, ['_id', 'email']); //pick only id and email which is to be returned

}

//add instance methods generateAuthToken which returns a token
UserSchema.methods.generateAuthToken = function () {  //using regular function and now arrow function bcos arrow functions do not bind this keyword
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();  //instead of access = access

  //push the tokens to the array (nested docs) in user table
  // user.tokens.push({
  //   access = access,
  //   token = token
  // });
  //above code recreated using new syntax
  user.tokens.push({access, token});

  //Now save which returns a success promise function
  return user.save().then(() => {
    return token;
  });
};

//UserSchema.statics is like a method but like a model method instead of instance method
UserSchema.statics.findByToken = function (token) {
  var User = this;  //used upperCAse User as this is treated as model and not instance which is smallcase user
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }
  //if try block does not fail
  return User.findOne({  //returns the values from the nested docs, arrays in the table
    '_id': decoded._id,
    'tokens.token' : token,
    'tokens.access': 'auth'
  });


};


//Create model for Users table passing in the schema
var User = mongoose.model('Users', UserSchema );


module.exports = {User};
