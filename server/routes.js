// Express
const express = require('express');
const router = express.Router();
const Form = require('./models/Form');

router.post('/users', async (req, res, next) => {
  try {
    const { first_name, last_name, email } = req.body;
    const newUser = await User.create({
      first_name,
      last_name,
      email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/forms', async (req, res, next) => {
  try {
    const {
      created_by = '6891ee66093f3f5d1552a0c9',
      title,
      description,
      status,
      slug = 'asdafbqw8ebadb',
    } = req.body;

    const newForm = await Form.create({
      created_by,
      title,
      description,
      status,
      slug,
    });
    res.status(201).json(newForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users', async (req, res, next) => {
  const { keyword } = req.body;
  try {
    const users = await User.findOne({
      $or: [
        { first_name: { $regex: keyword, $options: 'i' } },
        { last_name: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } },
      ],
    });
    res.json({ users });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// test route
router.get('/health', async (req, res, next) => {
  const time = process.uptime();
  console.log(time);
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

// error test
router.get('/error', async (req, res, next) => {
  try {
    console.log('error test!');
    const error = new Error('This is an error');
    error.status = 201;
    throw error;
  } catch (error) {
    next(error);
  }
});

module.exports = router;
