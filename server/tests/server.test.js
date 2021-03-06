const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');  //the 2 dots .. is to go one folder backwards
const {Todo} = require('./../models/todo.js');

//create an array of  objects to add to the todos table
const todos = [{
  text: 'First test todo'
},{
  text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => { //First make the Todos table empty, then its done to execute below tests
      return Todo.insertMany(todos);  //Then save all the todos array in to table
    }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

      request(app)
        .post('/todos')
        .send({text})
        .expect(200)  //expect status is 200 which is OK
        .expect((res) => {
          expect(res.body.text).toBe(text) //expect body of hte response to be text which also should be equal to text defined above

        })
        .end((err, res) => {  //executing the above test will have an error or a response
          if (err) {
            return done(err);  //if error stop executing below lines
          }

          //if no error, check to see if mongodb was updated with the text

          Todo.find({text}).then((todos) => {
            //assuming table has the defined text
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);  //expect that 1 item (text) to the text variable we passed
            done();
          }).catch((e) => done(e));  //catch error if any
        });
  });

  //Run another test to not save data with invalid body data
  it('should not create todo with invalid body data', (done) => {

    request(app)
    .post('/todos')
    .send({}) //send blank
    .expect(400) //expect 400 to fail
    .end((err,res) => {
      if(err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);  //expecting the 2 todos array is saved, then it will have only 2 items
        done();
      }).catch((e) => done(e));
    });
  });
});

//Test GET
describe('GET /todos',() => {
  it('should get all todos',(done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);  //expect 2 items in the table
    })
    .end(done);
  });
});
