const Users = require("../models/userModel");
const Teams = require("../models/teamModel");
const Matches = require("../models/matchModel");

const matchCtrl = {
  createMatch: async (req, res) => {
    try {
      const { date } = req.body;
      if (!date) {
        res
          .status(301)
          .json({ mag: "please mention date to create the match" });
      }
      const Match = new Matches(req.body);
      const match = await Match.save();
      return res.json(match);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getMatch: async (req, res) => {
    try {
      console.log(req.params.id);
      const match = await Matches.findById(req.params.id).populate(
        "team1 team2"
      );
      console.log(match);
      if (!match) {
        return res.status(400).json({ msg: "requested match does not exist." });
      }

      return res.json({ match });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllMatch: async (req, res) => {
    try {
      console.log(req.params.id);
      const match = await Matches.find().populate(
        "team1 team2"
      );
      console.log(match);
      return res.json({ match });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateMatch: async (req, res) => {
    try {
      await Matches.findOneAndUpdate({ _id: req.body.id }, req.body);
      return res.json({ msg: "Match updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = matchCtrl;
