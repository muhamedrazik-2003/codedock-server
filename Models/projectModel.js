const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
  githubrepository: {
    type: String,
    required: true,
    unique: true,
  },
  livelink: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const projects = mongoose.model("projects", projectSchema);
module.exports = projects;
