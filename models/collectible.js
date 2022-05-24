const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectibleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    graphic: {
      type: String,
    },
  },
  { timestamps: true }
);

const Collectible = mongoose.model("Collectible", collectibleSchema);

module.exports = Collectible;
