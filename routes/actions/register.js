'use strict';

let express = require('express');
let connection = require('./sql');
const crytpo = require("crypto");

let router = express.Router();

router.post('/', (req, res) => {
    let username = req.body.username;
    if (username.length < 6) {
        res.send('{"code":"-2"}');
        return;
    }
    let pwd = req.body.password;
    if (pwd.length<6||pwd.length>20) {
        res.send('{"code":"-3"}');
        return;
    }
    let salt = randomString(Math.floor(Math.random() * 5) + 15);
    let hmac = crytpo.createHmac("sha256", salt);
    pwd = hmac.update(pwd).digest('hex');

    connection.query('INSERT INTO `users`(username,password,salt) VALUES (?,?,?);', [username, pwd, salt], function (err, rs) {
        if (err) {
            res.send('{"code":"-1"}');
        } else {
            res.send('{"code":"1"}');
        }
    })
});

module.exports = router;


function randomString(length) {
    let chars = '0123456789~-=[]\\;\',./abcdefghijklmnopqrstuvwxyz!@#&ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|":?><';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}