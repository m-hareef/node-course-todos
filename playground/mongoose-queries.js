const {ObjectID} = require('mongodb')  //in this case, used to check if our var id is a valid object

const {mongoose} = require('./../server/db/mongoose');  //the 2 dots .. is to go one folder backwards
const {Todo} = require('./../server/models/todo.js');

var id = '69c387c80c175a06432d123e1';

//CHECK IF id is valid Object
if (!ObjectID.isValid(id)) {
  console.log('ID is not valid');
};

Todo.find({
  _id: id
}).then((todos) => {

  console.log('Todos Array: ', todos);  //Returns an array of all rows in table
});

Todo.findOne({
  _id: id
}).then((todo) => {
  if (!todo) {  //If no todo returned if invalid id given
    return console.log('Id not found');
  };
  console.log('Todo as String : ', todo); //Returns first matching row as a string and not as an array
});

Todo.findById(id).then((todo) => {  //Finding by id is simple
  console.log('Todo by Id: ', todo);
}).catch((e) => console.log(e));
