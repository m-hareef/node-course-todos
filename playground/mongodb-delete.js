// const Mo ngoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');  //above code used as destructuring to pull any properly from mongodb library

//Create database if not existing named TodoApp
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server'); //return so that it exits after this statement
  }
  console.log('Connected to MongoDB server');

  //dlete many
  // db.collection('Todos').deleteMany({text:'Buy Grocery'}).then((result) => {
  //   // console.log(result); //deletes and shows a ton of info
  //   console.log(result.result); //shows only the rows deleted
  // });
  // //delete One
  // db.collection('Todos').deleteOne({text:'Buy Grocery'}).then((result) => {
  //   console.log(result.result); //.result shows only the rows deleted
  // });
  //findone and delete. this finds one record and deletes only the first found record
  db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
    console.log(result); //result shows the row deleted
  });


  // db.close();
});
