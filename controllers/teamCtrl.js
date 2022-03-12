const Users = require("../models/userModel");
const Teams = require("../models/teamModel");

const teamCtrl = {
  createTeam: async (req, res) => {
    try {
      const Team = new Teams(req.body);
      const team = await Team.save();
      return res.json(team);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  searchTeam: async (req, res) => {
    try {
      const teams = await Teams.find({
        name: { $regex: req.query.name },
      }).limit(10);
      return res.json({ teams });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getTeam: async (req, res) => {
    try {
      console.log(req.params.id);
      const team = await Teams.findById(req.params.id).populate(
        "match captain teamPlayers.user"
      );

      console.log(team);
      if (!team) {
        return res.status(400).json({ msg: "requested team does not exist." });
      }

      return res.json({ team });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateTeam: async (req, res) => {
    try {
      await Teams.findOneAndUpdate({ _id: req.body.id }, req.body);
      return res.json({ msg: "Team updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addSupporterToTeam: async (req, res) => {
      try {
          const { userId, money } = req.body;
          const team = team.find(req.params.id);
          if (!team) {
              return res.status(400).json({ msg: "Couldn't find the team" });
          }
          const supporters = team.Supporters.filter((item) => {
              return (item.user !== userId)
          });
          supporters.add({
              user: userId,
              money: money,
          });
          team.Supporters = supporters;
          const Team = await team.save();
          return res.status(200).json(Team);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = teamCtrl;
