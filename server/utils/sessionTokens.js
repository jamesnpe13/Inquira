const ms = require('ms');
const { getDeviceMeta } = require('../functions/metadata');
const jwt = require('jsonwebtoken');

/* Configs/variables */
const maxAge = ms(process.env.REFRESH_TOKEN_EXPIRES_IN);
const refreshTokenCookieConfig = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/',
  maxAge,
};

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

module.exports = { generateTokens, clearRefreshToken, refreshTokenCookieConfig };
