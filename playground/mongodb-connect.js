// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		console.error(err);
		return console.error('Unable to connect to DB');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').insertOne({
	// 	text: 'Something Todo',
	// 	completed: false
	// }, (err, result) => {
	// 	if (err) {
	// 		console.error(err);
	// 		return console.error('Unable to insert ToDo');
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	db.collection('Users').insertOne({
		name: 'New User',
		age: 29,
		location: 'Chicago'
	}, (err, result) => {
		if (err) {
			console.error(err);
			return console.error('Unable to add user');
		}
		// console.log(JSON.stringify(result.ops, undefined, 2));
		console.log(result.ops[0]._id.getTimestamp());
	});

	client.close();
});