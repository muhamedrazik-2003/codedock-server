const jwt = require("jsonwebtoken");
const jwtMiddleware = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    try {
      const user = jwt.verify(token, process.env.SECRETKEY);
      console.log(user);
      request.payload = user.user;
      next();
    } catch (error) {
      response.status(401).json(error);
    }
  } catch (error) {
    response.status(400).json(error);
  }
};
module.exports = jwtMiddleware;
