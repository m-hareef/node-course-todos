var mongoose = require('mongoose')


//create a model for the Todos table
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required:true,
    minlength: 1,
    trim: true  //removes white spaces from both ends
    //refer http://mongoosejs.com/docs/validation.html
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId , //This will be an object as the id of the user is an object
    required: true
  }
});

module.exports = {Todo};
