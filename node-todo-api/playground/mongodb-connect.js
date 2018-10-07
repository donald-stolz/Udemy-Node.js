const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
	if (err) {
		console.error('Unable to connect to DB');
		return console.error(err);
	}
	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp');

	db.collection('Todos').insertOne({
		text: 'Something Todo',
		completed: false
	}, (err, result) => {
		if (err) {
			console.error('Unable to insert ToDo');
			return console.error(err);
		}

		console.log(JSON.stringify(result.ops, undefined, 2));
	})

	client.close();
});