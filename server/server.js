require('./config/config');  //Load the config file

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser'); //bodyParser takes JSON and conerts into an object
const {ObjectID} = require('mongodb')  //in this case, used to check if our var id is a valid object


var {mongoose} = require('./db/mongoose.js') ; //import the mongoose.js file creating a local variable {}
var {Todo} = require('./models/todo.js') ;
var {User} = require('./models/user.js') ;

var app = express();
const port = process.env.PORT || 3000; //Use heroku's environment port or use 3000

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

//GET from URL String
app.get('/todos/:id', (req, res) => {  // :id is the parameter key
  var id = req.params.id;

  //check if id is valid
  if (!ObjectID.isValid(id)) {
    // console.log('id is invalid');
    return res.status(404).send();  //404 is not found code
  }

  Todo.findById(id).then((todo) => {
    //check if to do is returned
    if (!todo) {
      return res.status(404).send(); //No todo exists with that id
    }
    //if found
    res.send({todo});
  }).catch((e) =>  {
    res.status(400).send();
  });
});

//Route for delete
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send(); //No todo exists with that id
      }
      res.send({todo});  //send todo which is removed as response
    }).catch((e) => {
      res.status(400).send();
    });
});

//For update use app.patch
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  //from lodash library
  var body = _.pick(req.body, ['text','completed']); //from req.body, pick text and completed JSON keys or properties
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  //if body.completed is a boolean && if body.completed is True
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
    body.completed = false;
  }
//We already defined the updates in the var body given above
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => { //new: true is given to return updated document and not original document
    if (!todo) {
      return res.status(404).send(); //No todo exists with that id
    }
    res.send({todo});  //send todo which is updated as a response
  }).catch((e) => {
    res.status(400).send();
  })
});


//POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']) //from the body we sent in postman pick email and password keys
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();  //call defined method in user.js to get the token
  }).then((token) => {
    //If save was success, return back the user details with the header
    res.header('x-auth', token).send(user); //header takes 2 arguments custom created header x-auth and 2nd argument is the token 
  }).catch((e) => {
    res.status(400).send(e);
  })
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = { app };
