const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    familyName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    gradeLevel: {
      type: String,
      required: true,
    },
    subjects: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    social: {
      type: String,
    },
    resources: [],
    stats: {},
  },
  { timestamps: true }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
