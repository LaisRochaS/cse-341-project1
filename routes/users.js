const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('_', usersController.getAll);
router.get('_:id', usersController.getSingle);

module.exports = router;