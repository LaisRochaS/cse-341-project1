const router = require('express');
const router = router.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);

module.exports = router;