const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
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
    resourcesCurrentPages: [],
    currentPage: {
      type: String,
    },
    currentPageNumber: {
      type: Number,
    },
    currentPageIndex: {
      type: Number,
    },
    completed: [],
    collections: [],
    stats: {},
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
