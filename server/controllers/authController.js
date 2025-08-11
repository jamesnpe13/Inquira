const { createUser_validationSchema } = require('../validations/userValidations');
const { getDeviceMeta } = require('../functions/metadata');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const ms = require('ms');

/* Configs/variables */
const refreshTokenCookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
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
    return res.status(201).json({ message: 'User created', user: result });
  } catch (error) {
    return next(error);
  }
};

/* login user */
exports.userLogin = async (req, res, next) => {
  const { email: inputEmail, password: inputPassword } = req.body;

  try {
    const resultUser = await User.findOne({ email: inputEmail });
    const { password: dbHashedPassword } = resultUser;

    // check if password match
    const isMatch = await bcrypt.compare(inputPassword, dbHashedPassword);
    if (!isMatch) throw new Error('Invalid credentials');

    const payload = {
      id: resultUser._id,
      email: resultUser.email,
      firstName: resultUser.first_name,
      lastName: resultUser.last_name,
    };

    const { ip } = getDeviceMeta(req);

    // issue access token
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });

    // issue refresh token
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });

    const refresh_token_idx = resultUser.refresh_tokens.findIndex((x) => x.ip === ip);
    const isIpExist = resultUser.refresh_tokens[refresh_token_idx];

    // save refresh to db
    // check refresh token with matching device ip
    if (isIpExist) {
      resultUser.refresh_tokens[refresh_token_idx].value = refreshToken; // if ip exists in db then overwrite
    } else {
      resultUser.refresh_tokens.push({ value: refreshToken, ip: ip }); // ip not then create new refres token document
    }
    await resultUser.save();

    // save refresh token to cookie
    const maxAge = ms(process.env.REFRESH_TOKEN_EXPIRES_IN);
    res.cookie('refreshToken', refreshToken, {
      ...refreshTokenCookieConfig,
      maxAge,
    });

    return res.status(200).json({ message: 'User login successful', accessToken: accessToken });
  } catch (error) {
    return next(error);
  }
};

/* logout user */
exports.userLogout = async (req, res, next) => {
  const refreshTokenCookie = req.cookies.refreshToken;
  try {
    // delete http cookie
    if (refreshTokenCookie) {
      res.clearCookie('refreshToken', {
        ...refreshTokenCookieConfig,
      });
    }

    // delete refersh_token document in db
    const resultUser = await User.findOne({ _id: req.user.id });
    const refresh_token_idx = resultUser.refresh_tokens.findIndex((x) => x.ip === getDeviceMeta(req).ip);
    resultUser.refresh_tokens.splice(refresh_token_idx, 1);

    await resultUser.save();
    return res.status(200).json({ message: 'User successfully logged out' });
  } catch (error) {
    return next(error);
  }
};

/* refresh token */
exports.refreshToken = async (req, res, next) => {
  try {
  } catch (error) {}
};

/* Functions */
// revoke refresh token in db
const revokeRefreshToken = async (userDbRef, refreshTokenIdx) => {
  userDbRef.refresh_tokens[refreshTokenIdx].isRevoked = true;
  userDbRef.save();
};
