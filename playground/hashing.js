const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// ENCRYPT
bcrypt.genSalt(10, (err,salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);  //The results will be different each time
  })
})

// DECRYPT
var hashedPassword = '$2a$10$xQD9gsFhjwm3TGdCGk27XujBC2fbA7YU2FxnETKn93D9unQ7R.ife';

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);  //returns true or false
})


//BELOW IS NOT SO STRONG method
//
// var data = {
//   id: 10
// };
//
// var token = jwt.sign(data.id, '123abc') //our secret is 123abc
//
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc')
// console.log('decoded', decoded);
