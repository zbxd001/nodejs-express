'use strict';

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  let rString = randomString(Math.floor(Math.random() * 5) + 5);
  req.session.salt = rString;
  res.render('login',{salt:rString});
})

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/main', (req, res) => {
  res.render('main');
});

router.get('/flowers', (req, res) => {
  res.render('flowers');
});

module.exports = router;

function randomString(length) {
  let chars = '0123456789~-=[]\\;\',./abcdefghijklmnopqrstuvwxyz!@#&ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|":?><';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}