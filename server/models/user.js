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

//Create model for Users table passing in the schema
var User = mongoose.model('Users', UserSchema );


module.exports = {User};
