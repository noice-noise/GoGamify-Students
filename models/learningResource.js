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
    students: [Number],
    body: {
      type: String,
      required: true,
    },
    pages: { type: Number },
    badges: [],
    achievements: [],
  },
  { timestamps: true }
);

const LearningResource = mongoose.model(
  "LearningResource",
  learningResourceSchema
);

module.exports = LearningResource;
