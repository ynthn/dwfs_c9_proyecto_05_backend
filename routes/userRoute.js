const express = require('express');
const {createUser, getUsers, editUser, deleteUser, loginUser, getProfile, getVerifyUser}  = require('../controllers/userController');
const {auth, admin} = require('../middleware/auth');

const userRouter = express.Router();

userRouter.route('/user')
    .post(createUser)
    .get(auth, admin, getUsers);

userRouter.route('/user/:id')
    .put(auth, editUser)
    .delete(auth, deleteUser)
    .get(getProfile);

userRouter.route('/login')
    .post(loginUser);

userRouter.route("/verifyUser")
    .get(auth, getVerifyUser);


module.exports = userRouter;