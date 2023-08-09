const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, user?.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Password do not match" });
    }

    const token = jwt.sign(
      {
        fullName: user?.fullName,
        email: user?.email,
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({ message: "Login Successfull", loggedInUser: user, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  // function for getting all users
};
