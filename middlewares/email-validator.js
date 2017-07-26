var emailRegexp  = new RegExp('.+\@.+\..+');
var err = new Error('invalid email');

var emailValidator = function(req, res, next) {
  var { email } =  req.body;
  var isValidEmail = emailRegexp.test(email);
  if ((req.method === 'POST' && isValidEmail) || (req.method === 'PUT' && isValidEmail)) {
    next();
  } else {
    next(err);
  }
};

module.exports = emailValidator;