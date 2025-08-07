// Express
const express = require('express');
const router = express.Router();

// Route controllers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const formController = require('./controllers/formController');

// Auth routes

// User routes
router.post('/users', userController.createUser);
router.get('/users', userController.searchUser);

// Form routes
router.post('/forms', formController.createForm);
router.post('/forms/:formId/pages', formController.createPage);
router.post('/forms/:formId/pages/:pageId/sections', formController.createSection);

// util routes
router.get('/health', async (req, res, next) => {
  const time = process.uptime();
  const timeConv = () => {
    if (time < 60) return Math.floor(time).toString().concat('s'); // seconds
    if (time >= 60)
      return Math.floor(time / 60)
        .toString()
        .concat('m'); // minutes
  };

  res.json({
    message: 'ok',
    uptime: timeConv(),
  });
});

module.exports = router;
