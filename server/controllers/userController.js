const User = require('../models/User');
const {
  createUser_validationSchema,
} = require('../validations/userValidations');

// Create user
exports.createUser = async (req, res, next) => {
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
};

// Search user
exports.searchUser = async (req, res, next) => {
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
};
