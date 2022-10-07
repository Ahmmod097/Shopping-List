import { auth } from "../middleware/auth";
import User from "../model/User";

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const generatePassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const generateJwtToken = async (userId) => {
  return jwt.sign({ id: userId }, config.get("jwtSecret"), { expiresIn: 3600 });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res
      .status(400)
      .json({ message: "Please fill up all the required fields to register" });
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json({ message: "User already exist" });
  }

  const newUser = await User.create({
    name,
    email,
    password: await generatePassword(password),
  });

  if (!newUser) {
    res.status(400).json({ message: "User can not be created" });
  }

  const { _id } = newUser;
  const token = await generateJwtToken(_id.toString());

  return res.status(201).json({
    message: "Ok",
    result: {
      token,
      email: newUser.email,
      name: newUser.name,
      userId: newUser._id.toString(),
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ message: "Please fill up all the required fields to register" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ message: "User not exist" });
  }

  const isPasswordSame = await bcrypt.compare(password, user.password);

  if (!isPasswordSame) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({
    message: "Ok",
    result: {
      token: await generateJwtToken(user._id.toString()),
    },
  });
};

const getUser = async (req, res, auth) => {
  const { id } = req.user;

  const user = await User.findById({ _id: id }).select(
    "-password -register_date"
  );

  return res.status(200).json({
    message: "Ok",
    result: {
      user,
    },
  });
};

export { register, login, getUser };
