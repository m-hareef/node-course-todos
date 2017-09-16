// const Mo ngoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');  //above code used as destructuring to pull any properly from mongodb library

//Create database if not existing named TodoApp
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server'); //return so that it exits after this statement
  }
  console.log('Connected to MongoDB server');

  //Update using $set
  // db.collection('Todos').findOneAndUpdate({  // findOneAndUpdate(filter, update, options, callback) {Promise}
  //   _id: new ObjectID('59bc2511c48aa40cd44374d4') //filter
  // }, {
  //   $set: {  //Use the $set update operator. refer mongodb update operators for more reference
  //     completed: true //update
  //   }
  // }, { //options
  //   returnOriginal: false  //default is true. giving false so that it displays the updated document and not original
  // }).then((result) => { //instead or callback we use promise
  //   console.log(result);
  // });

  //Update using $set and $inc
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('59bca037ecd87fa03fe95f83')
  }, {
    $set: {
      name: 'Zayan',
    },
    $inc: {
      age: 1  //increment age by 1. So if age is 5, it will change to 6
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  // db.close();
});
