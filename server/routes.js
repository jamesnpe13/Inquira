// Express
const express = require('express');
const router = express.Router();
const joiValidate = require('./functions/joiValidate');
const User = require('./models/User');
const Form = require('./models/Form');
const {
  createUser_validationSchema,
} = require('./validations/userValidations');
const {
  createSection_validationSchema,
} = require('./validations/formValidations');

router.post('/users', async (req, res, next) => {
  const { error, value } = createUser_validationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) return next(error);

  try {
    const { first_name, last_name, email } = value;
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

router.post('/forms/:formId/pages', async (req, res) => {
  try {
    const { formId } = req.params;
    const pageData = req.body;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    form.pages.push(pageData);
    await form.save();

    return res.status(201).json({ message: 'Page added', pages: form.pages });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/forms/:formId/pages/:pageId/sections
router.post('/forms/:formId/pages/:pageId/sections', async (req, res, next) => {
  const { error, value } = createSection_validationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return next(error);
  }

  console.log('here');
  try {
    const { formId, pageId } = req.params;
    const sectionData = value; // { title, content, order }

    const form = await Form.findById(formId);
    if (!form) return res.status(404).json({ error: 'Form not found' });

    // Find the page inside pages array by _id
    const page = form.pages.id(pageId);
    if (!page) return res.status(404).json({ error: 'Page not found' });

    // Push new section
    page.sections.push(sectionData);

    await form.save();

    return res
      .status(201)
      .json({ message: 'Section added', sections: page.sections });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
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
