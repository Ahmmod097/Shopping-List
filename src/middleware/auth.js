const config = require("config");
const jwt = require("jsonwebtoken");

export function auth(req, res, next) {
  const token = req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized operation" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "token is not valid" });
  }
}