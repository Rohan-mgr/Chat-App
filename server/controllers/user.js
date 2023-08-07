const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName, email, password);

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      res.status(409).json({ message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const token = jwt.sign(
      {
        fullName: fullName,
        email: email,
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    const registeredUser = await newUser.save();
    res.status(200).json({
      message: "User Registered Successfully",
      user: registeredUser,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
