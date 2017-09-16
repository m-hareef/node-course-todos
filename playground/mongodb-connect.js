// const Mo ngoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');  //above code used as destructuring to pull any properly from mongodb library

//Create database named TodoApp
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server'); //return so that it exits after this statement
  }
  console.log('Connected to MongoDB server');

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
