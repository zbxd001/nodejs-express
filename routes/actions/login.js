'use strict';

let express = require('express');
let connection = require('./sql');
const crytpo = require("crypto");

let router = express.Router();

router.post('/', (req, res) => {
    let username = req.body.username;
    let pwd = req.body.password;
    let front_salt = req.session.salt;
    if (!front_salt || pwd.length < 6) {
        res.send('{"code":"-1"}');
        return;
    }
    req.session.salt = null;

    pwd = new Buffer.from(pwd, 'base64').toString();
    if (pwd.substring(pwd.length - front_salt.length) !== front_salt) {
        res.send('{"code":"-1"}');
        return;
    }
    pwd = pwd.substring(0, pwd.length - front_salt.length);

    let sql = 'SELECT * FROM `users` WHERE username = (?)';
    connection.query(sql, username, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        let user = JSON.parse(JSON.stringify(results));

        try {
        if (!user) {
            res.send('{"code":"-1"}');
            return;
        }
        user = user[0];
        pwd = crytpo.createHmac("sha256", user.salt).update(pwd).digest('hex');

        }
        catch (e) {
            res.send('{"code":"-1"}');
            return;
        };

        if (pwd === user.password) {
            req.session.userid = user.id;
            res.send('{"code":"1"}');
        } else {
            res.send('{"code":"-1"}');
        }
    });
});

module.exports = router;
