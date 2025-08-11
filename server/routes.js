const { authenticateToken } = require('./middleware/authenticateToken');

// Express
const express = require('express');
const router = express.Router();

// Route controllers
const response = require('./controllers/formController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const formController = require('./controllers/formController');
const utilController = require('./controllers/utilController');
// Auth routes
router.post('/auth/register', authController.userRegister);
router.post('/auth/refresh', authenticateToken, authController.refreshToken);
router.post('/auth/logout', authenticateToken, authController.userLogout);
router.post('/auth/login', authController.userLogin);
// User routes
// Form routes
router.post('/forms/:formId/pages/:pageId/sections', formController.createSection);
router.post('/forms/:formId/pages', formController.createPage);
router.post('/forms', formController.createForm);
// util routes
router.get('/health', utilController.checkApiHealth);

module.exports = router;
