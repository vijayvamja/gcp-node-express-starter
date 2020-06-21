const cors = require('cors');

exports.cors = () => {
  const options = {
    origin: true,
    credentials: true,
  };
  return cors(options);
};
