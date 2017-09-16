// const Mo ngoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //above code used as destructuring to pull any properly from mongodb library

//Create database if not existing named TodoApp
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server'); //return so that it exits after this statement
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
    console.log(result); //result shows the row deleted
  });


  // db.close();
});
