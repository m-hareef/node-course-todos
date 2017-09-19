var mongoose = require('mongoose')


//Create model for Users table
var User = mongoose.model('Users', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});


module.exports = {User};
