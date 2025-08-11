const { UAParser } = require('ua-parser-js');

function getDeviceMeta(req) {
  const ua = req.headers['user-agent'] || '';
  const parser = new UAParser(ua);
  const result = parser.getResult();

  return {
    device: result.device,
    os: result.os,
    browser: result.browser,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: ua,
    timestamp: new Date(),
  };
}

module.exports = { getDeviceMeta };
