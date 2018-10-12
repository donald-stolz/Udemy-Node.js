// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		console.error(err);
		return console.error('Unable to connect to DB');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// db.collection('Todos').find({completed: false}).toArray().then((docs) => {
	// 	console.log('Todos:');
	// 	console.log(JSON.stringify(docs, undefined, 2));		
	// }, (err) => {
	// 	console.error(err);
	// 	return console.error('Unable to fetch todos');
	// });

	// db.collection('Todos').find().count().then( (count) => {
	// 	console.log(`Todos count: ${count}`);
	// }, (err) => {
	// 	console.error(err);
	// 	return console.error('Unable to fetch todos');
	// });
	
	db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
		console.log('Users Named Andrew:');
		console.log(JSON.stringify(docs, undefined, 2));		
	}, (err) => {
		console.error(err);
		return console.error('Unable to fetch todos');
	});
	client.close();
});