const express = require('express');
const { createUser, editUser, deleteUser, loginUser, getProfile, getVerifyUser } = require('../controllers/userController');
const { auth, admin } = require('../middleware/auth');

const userRouter = express.Router();

userRouter.route('/user')
    .post(createUser);

userRouter.route('/user/:id')
    .put(auth, editUser)
    .delete(auth, deleteUser)
    .get(auth, getProfile);

userRouter.route('/login')
    .post(loginUser);

userRouter.route("/verifyUser")
    .get(auth, getVerifyUser);


module.exports = userRouter;