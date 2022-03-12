const router = require("express").Router();
const matchCtrl = require("../controllers/matchCtrl");

router.post("/match", matchCtrl.createMatch );

router.get("/match/:id", matchCtrl.getMatch);

router.get("/match", matchCtrl.getAllMatch);

router.put("/match", matchCtrl.updateMatch);

module.exports = router;
