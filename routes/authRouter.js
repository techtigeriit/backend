const router = require("express").Router();
const authCtrl = require("../controllers/authCtrl");

router.post("/register", authCtrl.register);
router.post("/changePassword", authCtrl.changePassword);

router.post("/login", authCtrl.login);

module.exports = router;
