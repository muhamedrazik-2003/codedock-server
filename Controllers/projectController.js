const projects = require("../Models/projectModel");

exports.addProject = async (request, response) => {
  try {
    const userId = request.payload;
    const { title, description, languages, githubrepository, livelink } =
      request.body;
    const image = request.file.filename;
    const existingProject = await projects.findOne({ githubrepository });
    if (existingProject) {
      response.status(406).json("Project already Added");
    } else {
      const newProject = new projects({
        title,
        description,
        languages,
        githubrepository,
        livelink,
        image,
        userId,
      });
      await newProject.save();
      response.status(200).json(newProject);
    }
  } catch (error) {
    console.log(error);
    response.status(404).json(error);
  }
};

exports.allProjects = async (request, response) => {
  try {
    const projectList = await projects.find();
    response.status(200).json(projectList);
  } catch (error) {
    console.log(error);
    response.status(404).json(error);
  }
};
exports.userProjects = async (request, response) => {
  try {
    const userId = request.payload;
    const projectList = await projects.find({ userId });
    response.status(200).json(projectList);
  } catch (error) {
    console.log(error);
    response.status(404).json(error);
  }
};

exports.getProjectById = async (request, response) => {
  try {
    const { id } = request.params;
    const projectData = await projects.findById(id);
    response.status(200).json(projectData);
  } catch (error) {
    console.log(error);
    response.status(404).json(error);
  }
};
exports.deleteProject = async (request, response) => {
  try {
    const { id } = request.params;
    const projectData = await projects.findByIdAndDelete(id);
    response.status(200).json(projectData);
  } catch (error) {
    console.log(error);
    response.status(404).json(error);
  }
};
exports.updateProject = async (request, response) => {
  try {
    const { id } = request.params;
    let { title, description, languages, githubrepository, livelink, image } = request.body;
    if (request.file) {
      image = request.file.filename;
    }
    const projectData = await projects.findByIdAndUpdate(id, {
      title,
      description,
      languages,
      githubrepository,
      livelink,
      image,
    });
    response.status(200).json(projectData);
  } catch (error) {
    console.log(error);
    response.status(404).json(error);
  }
};
