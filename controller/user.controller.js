const EventEmitter = require('events');
const model = require('../model/user.model');

class UserController extends EventEmitter {
  handleWriteUser(req, res) {
    const user = req.body;

    model
      .writeUser(user)
      .then(() => {
        this.emit('handleWriteUser', user);
        return res
          .status(201)
          .send({ msg: 'Successfully wrote user into database', data: user });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ msg: `An error occured while writing User: ${err}` });
      });
  }
  handleGetUsers(req, res) {
    model
      .getUser()
      .then((data) => {
        return res.send({
          msg: 'Successfully fetched users from database',
          data,
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ msg: `An error occured while writing User: ${err}` });
      });
  }
  handleGetUserById(req, res) {
    const id = req.params.id;

    model
      .getUserById(id)
      .then((data) => {
        return res.send({
          msg: 'Successfully fetched users from database',
          data,
        });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ msg: `An error occured while getting User: ${err}` });
      });
  }
  handleUpdateUserById(req, res) {
    const id = req.params.id;
    const payload = req.body;

    model
      .updateUserById(id, payload)
      .then((data) => {
        return res.send({
          status: 'success',
          msg: `User with id ${id} has been updated successfully`,
          data,
        });
      })
      .catch((err) => {
        return res.send({
          status: 'error',
          msg: 'User could not be updated',
          err,
        });
      });
  }
  handleDeleteUserById(req, res) {
    const id = req.params.id;

    model
      .deleteUserById(id)
      .then(() => {
        this.emit('handleDeleteUser', id);
        return res.send({
          status: 'success',
          msg: `User with id ${id} has been deleted successfully`,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          status: 'error',
          msg: 'User could not be deleted',
          err,
        });
      });
  }
}

module.exports = new UserController();
