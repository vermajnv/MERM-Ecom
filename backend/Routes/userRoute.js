const express = require('express');
const { listUsers, registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, changePassword, updateProfile, verifyEmail, verificationLink } = require('../Controllers/user');
const {isAuthenticated} = require('../middleware/auth');
const Router = express.Router();

Router.route('/').get(listUsers);
Router.route('/register').post(registerUser);
Router.route('/login').post(loginUser);
Router.route('/logout').get(logoutUser);
Router.route('/forgot-password').post(forgotPassword);
Router.route('/reset-password/:token').put(resetPassword);
Router.route('/profile').get(isAuthenticated, getUserDetails);
Router.route('/change-password').put(isAuthenticated, changePassword);
Router.route('/update-profile').put(isAuthenticated, updateProfile);
Router.route('/verify-email/:token').put(verifyEmail);
Router.route('/verification-link').put(verificationLink);

module.exports = Router;