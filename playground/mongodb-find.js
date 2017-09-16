// const Mo ngoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');  //above code used as destructuring to pull any properly from mongodb library

//Create database named TodoApp
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server'); //return so that it exits after this statement
  }
  console.log('Connected to MongoDB server');

  //Fetch all documents (records) in Todos collection (table)
  // db.collection('Todos').find().toArray().then((docs) => { //get all documents to an array. The toArray returns a promise
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos');
  // });

  // db.collection('Todos').find({completed: true}).toArray().then((docs) => { //query documents to an array so that only filtered docs are shown
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos');
  // });

  // db.collection('Todos').find().count().then((count) => { //count documents
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch Todos');
  // });

  db.collection('Users').find({name:'Rashdan'}).toArray().then((Users) => {
    console.log(JSON.stringify(Users, undefined,2));
  }, (err) => {
    console.log('Unable to fetch Users');
  });

  // db.close();
});
