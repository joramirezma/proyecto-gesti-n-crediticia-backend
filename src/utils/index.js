const password = require('./password');
const jwt = require('./jwt');

module.exports = {
  ...password,
  ...jwt
};
