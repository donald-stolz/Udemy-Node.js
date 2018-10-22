// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
    'mongodb://localhost:27017/TodoApp',
    (err, client) => {
        if (err) {
            console.error(err);
            return console.error('Unable to connect to DB');
        }
        console.log('Connected to MongoDB server');
        const db = client.db('TodoApp');

        // findOneAndUpdate
        db.collection('Todos')
            .findOneAndUpdate(
                {
                    _id: new ObjectID(objID),
                },
                {
                    $set: { completed: true },
                },
                {
                    returnOriginal: false,
                }
            )
            .then(results => {
                console.log(results);
            });

        // findOneAndUpdate
        db.collection('Users')
            .findOneAndUpdate(
                {
                    _id: new ObjectID(objID),
                },
                {
                    $set: { name: 'Don Stolz' },
                    $inc: { age: 1 },
                },
                {
                    returnOriginal: false,
                }
            )
            .then(results => {
                console.log(results);
            });

        client.close();
    }
);
