const router = require("express").Router();
const teamCtrl = require("../controllers/teamCtrl");

router.post("/team", teamCtrl.createTeam);

router.put("/team", teamCtrl.updateTeam);

router.get("/team/searh", teamCtrl.searchTeam);

router.get("/team/:id", teamCtrl.getTeam);

router.put("/team/:id", teamCtrl.addSupporterToTeam);

router.get("/team/searh", teamCtrl.searchTeam);

module.exports = router;
