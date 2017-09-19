var mongoose  = require('mongoose');

//Mongoose supports callback by default, but we will use Promises
//Tell mongoose to use the built in Promise library instead of any third-party
mongoose.Promsie = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp-Mongoose',{
  useMongoClient: true

});
console.log('Connected');

module.exports = {mongoose};
