// const {SHA256} = require('crypto-js');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'abc123';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword =
    '$2a$10$NYTcrb7iZqP9JBctJo0LR.wm0v6GGvEvZRoRPciSXfnXW3/WTy4Ym';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// var data = {
// 	id: 10
// };

// var token = jwt.sign(data, '123abc');
// var decoded = jwt.verify(token, '123abc');
// console.log(`Token: ${token}`);
// console.log(`Decoded: ${decoded}`);

// var message = "Hello world";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };

// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'secret').toString()
// }

// var resultHash = SHA256(JSON.stringify(data) + 'secret').toString()
// if (resultHash === token.hash) {
// 	console.log('Data not changed.');
// } else {
// 	console.log('Data was changed.');
// }
