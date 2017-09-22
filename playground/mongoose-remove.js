const {ObjectID} = require('mongodb')  //in this case, used to check if our var id is a valid object

const {mongoose} = require('./../server/db/mongoose');  //the 2 dots .. is to go one folder backwards
const {Todo} = require('./../server/models/todo.js');


//Removes all documents from Todo
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

//findByIdAndRemove
// Todo.findByIdAndRemove('59c5315f5dd63e06ee0ac093').then((todo) => {
//   console.log(todo);
//   console.log('The above todo has been removed');
// });

//findOneAndRemove : it will remove the document matching the query argument passed
Todo.findOneAndRemove({text: 'Postman'}).then((todo) => {
  console.log(todo);
  console.log('The above todo has been removed');
});
