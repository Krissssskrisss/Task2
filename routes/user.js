const express = require('express');
const router = express.Router();
const User = require('../lib/user');
const userController = new User();


/* GET users listing. */
router.get('/', userController.get);

router.post('/', userController.add);

router.put('/', userController.update);

router.delete('/', userController.delete);

module.exports = router;