const { createUser_validationSchema } = require('../validations/userValidations');
const { getDeviceMeta } = require('../functions/metadata');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ms = require('ms');
const responseObject = require('../utils/response');

/* Configs/variables */
const maxAge = ms(process.env.REFRESH_TOKEN_EXPIRES_IN);
const refreshTokenCookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/',
  maxAge,
};

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
// exports.refreshToken = async (req, res, next) => {
//   try {
//     const refreshTokenCookie = req.cookies.refreshToken;

//     if (!refreshTokenCookie) {
//       return res.status(401).json({ message: 'Refresh token missing' });
//     }

//     const { user } = (await clearRefreshToken(refreshTokenCookie, res)) || {};

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid or malformed refresh token' });
//     }

//     const resultUser = await User.findOne({ _id: user.id });

//     if (!resultUser) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     const { accessToken, refreshToken } = await generateTokens(resultUser, req);

//     res.cookie('refreshToken', refreshToken, refreshTokenCookieConfig);
//     return res.status(200).json({ message: 'Token refreshed', accessToken });
//   } catch (error) {
//     // Check if error is a JWT error
//     if (error.name === 'TokenExpiredError') {
//       await this.userLogout(req, res, next);
//       return res.status(401).json({ message: 'Refresh token expired' });
//     } else if (error.name === 'JsonWebTokenError') {
//       await this.userLogout(req, res, next);
//       return res.status(401).json({ message: 'Invalid refresh token' });
//     }

//     // For other errors, log and respond with 500
//     console.error(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

/* Functions */
const generateTokens = async (userObject, req) => {
  const { ip } = getDeviceMeta(req);
  const payload = {
    id: userObject._id,
    email: userObject.email,
    firstName: userObject.first_name,
    lastName: userObject.last_name,
  };
  // issue access token
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });

  // issue refresh token
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });

  const refresh_token_idx = userObject.refresh_tokens.findIndex((x) => x.ip === ip);
  const isIpExist = userObject.refresh_tokens[refresh_token_idx];

  // save refresh to db
  // check refresh token with matching device ip
  if (isIpExist) {
    userObject.refresh_tokens[refresh_token_idx].value = refreshToken; // if ip exists in db then overwrite
  } else {
    userObject.refresh_tokens.push({
      value: refreshToken,
      ip: ip,
      expiresAt: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRES_IN)),
    });
  }
  await userObject.save();

  return { accessToken: accessToken, refreshToken: refreshToken };
};

const clearRefreshToken = async (refreshTokenCookie, res) => {
  // delete cookie
  if (refreshTokenCookie) {
    try {
      const decoded = jwt.verify(refreshTokenCookie, process.env.REFRESH_TOKEN_SECRET);
      const { id } = decoded;

      // delete from db
      const resultUser = await User.findOne({ _id: id });
      const refresh_token_idx = resultUser.refresh_tokens.findIndex((x) => x.value === refreshTokenCookie);
      resultUser.refresh_tokens.splice(refresh_token_idx, 1);
      await resultUser.save();
      return { user: decoded };
    } catch (error) {
    } finally {
      res.clearCookie('refreshToken', refreshTokenCookieConfig);
    }
  }
};
