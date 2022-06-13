const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const learningResourceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    owner: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    body: {
      type: Object,
      required: true,
    },
    modules: [],
    pages: { type: Number },
    collectibles: {
      type: Array,
    },
  },
  { timestamps: true }
);

const LearningResource = mongoose.model(
  "LearningResource",
  learningResourceSchema
);

module.exports = LearningResource;
