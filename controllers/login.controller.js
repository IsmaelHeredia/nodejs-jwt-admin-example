const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const authorize = require('../middleware/authorize')

router.get('', authorize.validate_login, index);
router.post('/login', authorize.validate_login, login);

module.exports = router;

function index(req, res) {
 
  // Register new user
  // userService.register({ username : "test", password : "test" });

  res.render('login/form_login', {
    title: 'Login'
  });
};

function login(req, res, next) {
  
	var username = req.body.username;
	var password = req.body.password;
  
	userService.login(username,password).then(function(result) {
	   var token = result.token;
	   res.cookie('jwt_cookie', token, { expires: new Date(Date.now() + 1 * 3600000), httpOnly: false, secure: false });
	   res.redirect('/admin')
	}).catch(function(err) {
	    next(err);
	});

};