// const Mo ngoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');  //above code used as destructuring to pull any properly from mongodb library

//Create database named TodoApp
let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mLab: 'mongodb://hareef:mLab123@ds143754.mlab.com:43754/todo-app'  //using mongodb cloud https://mlab.com usernme: hareef, password; mLab123
}
MongoClient.connect(db.mLab, (err, db) => {   //Connecting to mongodb mLab cloud using db.mLab. use db.localhost to connect locally
  if (err) {
    return console.log('Unable to connect to MongoDB Cloud server' , err); //return so that it exits after this statement
  }
  console.log('Connected to MongoDB cloud server');

  //Create a collection(table) called Todos and insert a document(record)
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err); //return so that it exits after this statement
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Muhammed Hareef',
    age: 39,
    location: 'Dubai, UAE'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
