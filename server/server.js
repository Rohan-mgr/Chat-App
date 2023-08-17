const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.routes");
const chatRouter = require("./routes/chat.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then((success) => {
    app.listen(process.env.PORT);
    console.log("Database Connection Successfull");
  })
  .catch((error) => {
    console.log("Database Connection failed!", error);
  });
