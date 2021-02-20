const router = require('express').Router();
const UserController = require('../../../controller/user.controller');

router.get('/', (req, res) => {
	return UserController.handleGetUsers(req, res);
});
router.post('/', (req, res) => {
	return UserController.handleWriteUser(req, res);
});

router.get('/:id', (req, res) => {
	return UserController.handleGetUserById(req, res);
});
router.put('/:id', (req, res) => {
	return UserController.handleUpdateUserById(req, res);
});
router.delete('/:id', (req, res) => {
	return UserController.handleDeleteUserById(req, res);
});

module.exports = router;
