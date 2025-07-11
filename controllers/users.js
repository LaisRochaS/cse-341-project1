const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all users
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find();
        const users = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get users' });
    }
};

// GET a single user by ID
const getSingle = async (req, res) => {
    const userId = req.params.id;

    // Validate ObjectId format
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID format' });
    }

    try {
        const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: new ObjectId(userId) });
        const users = await result.toArray();

        if (!users.length) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get user' });
    }
};

module.exports = {
    getAll,
    getSingle
};
