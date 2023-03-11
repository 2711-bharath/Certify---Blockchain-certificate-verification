const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connect } = require("./DB/connect");
const userRouter = require("./routes/userRoute");
const certificateRoute = require("./routes/certificateRoute");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(cookieParser());

app.use(function (req, res, next) {
  var cookie = req.cookies;
  if (cookie === undefined) {
    console.log("no cookie");
  } else {
    console.log("cookie exists", cookie);
  }
  next();
});

app.use("/user", userRouter);
app.use("/certificate", certificateRoute);

app.listen(3000, async () => {
  console.log("listening to port 3000");
  await connect();
});
