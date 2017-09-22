var mongoose  = require('mongoose');

//Mongoose supports callback by default, but we will use Promises
//Tell mongoose to use the built in Promise library instead of any third-party
mongoose.Promsie = global.Promise;

let db = {
  localhost: ' ',
  mLab: 'mongodb://hareef:mLab123@ds143754.mlab.com:43754/todo-app'  //using mongodb cloud https://mlab.com usernme: hareef, password; mLab123
}
mongoose.connect(db.mLab,{
  useMongoClient: true

});
console.log('Connected');

module.exports = {mongoose};
