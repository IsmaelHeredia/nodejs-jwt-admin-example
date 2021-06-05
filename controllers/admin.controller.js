const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const authorize = require('../middleware/authorize')

router.get('', authorize.validate_admin, index);
router.get('/logout', authorize.validate_admin, logout);

module.exports = router;
 
function index(req, res) {
  res.render('admin/welcome', {
    title: 'Admin',
    username: "admin"
  });
};

function logout(req, res) {
  res.clearCookie('jwt_cookie');
  res.redirect('/');
};