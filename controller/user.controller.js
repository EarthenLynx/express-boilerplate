const EventEmitter = require('events');
const model = require('../model/user.model');

class UserController extends EventEmitter {
  async handleWriteUser(req, res) {
    try {
      const user = req.body;
      const newUser = await model.writeUser(user);

      this.emit('handleWriteUser', newUser);
      return res
        .status(201)
        .send({ msg: 'Successfully wrote user into database', data: user });
    } catch (e) {
      return res
        .status(500)
        .send({ msg: `An error occured while writing User: ${e}` });
    }
  }
  async handleGetUsers(req, res) {
    try {
      const users = await model.getUser();
      return res.status(200).send(users);
    } catch (e) {
      return res
        .status(500)
        .send({ msg: `An error occured while writing User: ${e}` });
    }
  }
  async handleGetUserById(req, res) {
    try {
      const id = req.params.id;
      const users = await model.getUserById(id);
      res.status(200).send(users);
    } catch (e) {
      return res
        .status(500)
        .send({ msg: `An error occured while getting User: ${err}` });
    }
  }

  async handleUpdateUserById(req, res) {
    try {
      const id = req.params.id;
      const payload = req.body;
      const updatedUser = await model.updateUserById(id, payload);
      return res.status(200).send('OK');
    } catch (e) {
      return res.send({
        status: 'error',
        msg: 'User could not be updated',
        err,
      });
    }
  }

  async handleDeleteUserById(req, res) {
    try {
      const id = req.params.id;
      const deletedUser = await model.deleteUserById(id);

      this.emit('handleDeleteUser', id);
      return res.status(204).send({
        status: 'success',
        msg: `User with id ${id} has been deleted successfully`,
      });
    } catch (e) {
      return res.status(500).send({
        status: 'error',
        msg: 'User could not be deleted',
        e,
      });
    }
  }
}

module.exports = new UserController();
