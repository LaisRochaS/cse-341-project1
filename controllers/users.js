const mongodb = require('mongodb');
const { getDb } = require('./data/database'); 
const ObjectId = mongodb.ObjectId;

const getAll = async (req, res) => {
    try {
        const db = getDb();
        const users = await db.collection('users').find().toArray(); 
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getSingle = async (req, res) => {
    const userId = req.params.id; 

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const db = getDb();
        const user = await db.collection('users').findOne({ _id: find(ObjectId(userId)
        ) }); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); 
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAll,
    getSingle
};
