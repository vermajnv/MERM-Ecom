const express = require('express');
const { listUsers, registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require('../Controllers/user');
const Router = express.Router();

Router.route('/').get(listUsers);
Router.route('/register').post(registerUser);
Router.route('/login').post(loginUser);
Router.route('/logout').get(logoutUser);
Router.route('/forgot-password').post(forgotPassword);
Router.route('/reset-password/:token').put(resetPassword);

module.exports = Router;