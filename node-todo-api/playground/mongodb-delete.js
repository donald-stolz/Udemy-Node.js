// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
 
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		console.error(err);
		return console.error('Unable to connect to DB');
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	// deleteMany
	// db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// deleteMany
	// db.collection('Users').deleteMany({name: 'Andrew'}).then((result) => {
	// 	console.log(result);
	// });

	// deleteOne
	// db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete
	// db.collection('Todos').deleteOne({completed: false}).then((result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete
	// db.collection('Users').deleteOne({name: 'Mike'}).then((result) => {
	// 	console.log(result);
	// });
	
	client.close();
});