const express = require('express');
const { listUsers, registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, changePassword, updateProfile, verifyEmail, verificationLink, getSingleUser, updateRole } = require('../Controllers/user');
const {isAuthenticated, authoriseRole} = require('../middleware/auth');
const Router = express.Router();

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
// Admin Routes

Router.route('/').get(isAuthenticated, authoriseRole("admin"), listUsers);
Router.route('/:id').get(isAuthenticated, authoriseRole("admin"), getSingleUser);
Router.route('/update-role').put(isAuthenticated, authoriseRole('admin'), updateRole);
module.exports = Router;