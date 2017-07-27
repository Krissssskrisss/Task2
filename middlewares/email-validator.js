const emailRegexp  = new RegExp('.+\@.+\..+');
const err = new Error('invalid email');

const emailValidator = function(req, res, next) {
  const { email } =  req.body;
  const isValidEmail = emailRegexp.test(email);
  const method = req.method;
  if (!(method=== 'POST' || method === 'PUT')) {
    next();
  } else  if ((method === 'POST' && isValidEmail) || (method === 'PUT')) {
    next()
  } else {
    next(err);
  }
};

module.exports = emailValidator;