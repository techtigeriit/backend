const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");

router.get("/search", userCtrl.searchUser);

router.get("/user/:id", userCtrl.getUser);

router.patch("/user", userCtrl.updateUser);

module.exports = router;
