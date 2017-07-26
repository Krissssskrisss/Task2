var emailRegexp  = new RegExp('.+\@.+\..+');
var emailValidator = function(req, res, next) {
  if ((req.method === 'post' && req.body.email.match(emailRegexp)) || (req.method === 'put' && req.body.email.match(emailRegexp))) {
    next();
  } else {
    next();
  }
}

module.exports.emailValidator = emailValidator;