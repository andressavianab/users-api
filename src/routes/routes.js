var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UsersController = require("../controllers/UsersController");

router.get('/', HomeController.index);
router.post('/new/user', UsersController.create);
router.get('/users', UsersController.get);
router.get('/user/:id', UsersController.getById);
router.put('/user/:id', UsersController.updateUser);

module.exports = router;