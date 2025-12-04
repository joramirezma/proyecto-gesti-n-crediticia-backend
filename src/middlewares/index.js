const { authenticate, authorize } = require('./auth');
const validators = require('./validators');

module.exports = {
  authenticate,
  authorize,
  ...validators
};
