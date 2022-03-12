const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    captain: {
      type: String,
      required: true,
      trim: true,
    },
    teamPlayers: [
        {
        type: mongoose.Types.ObjectId,
        ref: "user",
    }
    ],
    name: {
      type: String,
      trim: true,
      maxlength: 25,
      default: "team1",
    },
    supporters: [
      {
        user: { type: mongoose.Types.ObjectId, ref: "user" },
        money: {
          type: Number,
          default: 0,
        },
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
    match: {
      type: mongoose.Types.ObjectId,
      ref: "matches",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("team", teamSchema);
