'use strict';

let express = require('express');
let router = express.Router();

router.use('/login', require("./actions/login"));

router.use('/register', require("./actions/register"));


module.exports = router;