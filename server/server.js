var express = require('express');
var bodyParser = require('body-parser'); //bodyParser takes JSON and conerts into an object

var {mongoose} = require('./db/mongoose.js') ; //import the mongoose.js file creating a local variable {}
var {Todo} = require('./models/todo.js') ;
var {User} = require('./models/user.js') ;

var app = express();

//bodyParser takes JSON and conerts into an object in this middle ware below
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log('Body: ' , req.body);
  var todo = new Todo({
    text: req.body.text  //Get the text key in the Json key value pairs from body sent by Postman
  });
  //save the model to database
  todo.save().then((doc) => { //if success doc will be returned or else the error
    res.send(doc);  //response will send the document back
  },(e) => {
    res.status(400).send(e); //http status 400 is for bad request. Refer: www.httpstatuses.com
  });
});

//GET request
app.get('/todos' , (req, res) => {
  //Get All todos
  Todo.find().then((todos) => {
    res.send({todos}); //send response as an object, you pass sevral datas when passing as object
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});


//
// //define data for the new model
// var newTodo = new Todo({
//   text: 'Learn',
//   completed: false,
//   completedAt: 30
// });
//
// //Save the defined data and use promise to log
// newTodo.save().then((doc) => {
//   console.log('Saved Todo', doc);
// }, (e) => {
//   console.log('Unable to save ', e);
// });
//
// //Create model for Users table
//
//
// var newUser = new User({
//   email: 'hareef@me.com'
// });
//
// newUser.save().then((doc) => {
//   console.log('Saved user',doc);
// }, (e) => {
//   console.log('Unable to save ', e);
// });

module.exports = { app };
