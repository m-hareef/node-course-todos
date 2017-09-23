var mongoose  = require('mongoose');

//Mongoose supports callback by default, but we will use Promises
//Tell mongoose to use the built in Promise library instead of any third-party
mongoose.Promsie = global.Promise;

//Commenting below to use NODE_ENV variable
// mongoose.connect(db.mLab,{
//   useMongoClient: true
//
// });

mongoose.connect(process.env.MONGODB_URI,{
  useMongoClient: true

});

console.log('Connected');

module.exports = {mongoose};
