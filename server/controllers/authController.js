const { createUser_validationSchema } = require('../validations/userValidations');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ms = require('ms');
const responseObject = require('../utils/response');
const { generateTokens, clearRefreshToken, refreshTokenCookieConfig } = require('../utils/sessionTokens');

/* register user */
exports.userRegister = async (req, res, next) => {
  const { error, value } = createUser_validationSchema.validate(req.body, { abortEarly: false });
  if (error) return next(error);

  // hash password
  const passwordHashed = await bcrypt.hash(value.password, 10);
  const newValue = { ...value, password: passwordHashed };

  try {
    const result = await User.insertOne(newValue);
    return responseObject(res, {
      success: true,
      status: 201,
      message: 'User created',
      data: {
        user: result,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/* login user */
exports.userLogin = async (req, res, next) => {
  const { email: inputEmail, password: inputPassword } = req.body;

  try {
    const resultUser = await User.findOne({ email: inputEmail });

    if (!resultUser) throw new Error('No user found');

    const { password: dbHashedPassword } = resultUser;

    // check if password match
    const isMatch = bcrypt.compare(inputPassword, dbHashedPassword);
    if (!isMatch) throw new Error('Invalid credentials');

    const { accessToken, refreshToken } = await generateTokens(resultUser, req);

    // save refresh token to cookie
    res.cookie('refreshToken', refreshToken, refreshTokenCookieConfig);

    return responseObject(res, {
      status: 200,
      message: 'User login successful',
      data: {
        accessToken: accessToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};

/* logout user */
exports.userLogout = async (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    await clearRefreshToken(refreshTokenCookie, res);
    return responseObject(res, {
      message: 'Successfully logged out',
    });
  } catch (error) {
    return next(error);
  }
};

/* refresh token */
exports.refreshToken = async (req, res, next) => {
  // get type
  const type = req.query.type;

  // get cookie
  const refreshTokenCookie = req.cookies.refreshToken;

  // check if there is cookie
  if (!refreshTokenCookie) {
    if (type === 'restore') {
      return responseObject(res, {
        message: 'No refresh token stored in cookie',
      });
    }

    return responseObject(res, {
      message: 'No refresh token stored in cookie',
      status: 401,
      success: false,
    });
  }

  // verify cookie
  let decoded;
  try {
    decoded = jwt.verify(refreshTokenCookie, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return next(error);
  }

  // get user
  const { id } = decoded;

  // find refresh token match in db
  try {
    const resultUser = await User.findOne({ _id: id });
    const isExist = resultUser.refresh_tokens.find((x) => x.value === refreshTokenCookie);

    if (isExist) {
      const { accessToken, refreshToken } = await generateTokens(resultUser, req);
      res.cookie('refreshToken', refreshToken);
      return responseObject(res, {
        status: 201,
        message: 'Successfully reissued tokens',
        data: {
          accessToken: accessToken,
        },
      });
    }
  } catch (error) {
    return next(error);
  }
};
