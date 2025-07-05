const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }

    MongoClient.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(client => {
            database = client.db();
            console.log('Database initialized!');
            return callback(null, database);
        })
        .catch(err => {
            console.error('Failed to connect to the database:', err);
            return callback(err);
        });
}
const getDb = () => {
    if (database) {
        return database;
    }
    throw new Error('Database is not initialized. Call initDb first.');
}
module.exports = {
    initDb,
    getDb
};