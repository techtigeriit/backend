const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema(
  {
    team1: {
      type: mongoose.Types.ObjectId,
      ref: "team",
      index: true,
    },
    team2: {
      type: mongoose.Types.ObjectId,
      ref: "team",
      index: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("match", matchSchema);
