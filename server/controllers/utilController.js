const responseObject = require('../utils/response');

// util routes
exports.checkApiHealth = async (req, res, next) => {
  const time = process.uptime();
  const timeConv = () => {
    if (time < 60) return Math.floor(time).toString().concat('s'); // seconds
    if (time >= 60)
      return Math.floor(time / 60)
        .toString()
        .concat('m'); // minutes
  };

  return responseObject(res, {
    status: 200,
    message: 'OK',
    data: {
      uptime: timeConv(),
    },
  });

  // res.json({
  //   message: 'ok',
  //   uptime: timeConv(),
  // });
};
