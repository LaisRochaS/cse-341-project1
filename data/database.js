const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;


const initDb = async () => {
    if (database) {
        console.log('Database is already initialized!');
        return database;
    }

    try {
        const client = await MongoClient.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        database = client.db(); 
        console.log('Database initialized!');
        return database;
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        throw err; 
    }
};


const getDb = () => {
    if (database) {
        return database;
    }
    throw new Error('Database is not initialized. Call initDb first.');
};

module.exports = {
    initDb,
    getDb
};
