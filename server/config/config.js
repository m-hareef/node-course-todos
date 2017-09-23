var env = process.env.NODE_ENV || 'development';  //NODE_ENV is available only on Heroku and not available locally. if in heroku it sets to production or else development
console.log('env ***** ', env);

//Give options to select DB for development, test or production
let db = {
  localhost: 'mongodb://localhost:27017/TodoApp-Mongoose',
  localhostTEST: 'mongodb://localhost:27017/TodoApp-TEST',
  mLab: 'mongodb://hareef:mLab123@ds143754.mlab.com:43754/todo-app'  //using mongodb cloud https://mlab.com usernme: hareef, password; mLab123
}

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = db.mLab;
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = db.localhostTEST;
}
