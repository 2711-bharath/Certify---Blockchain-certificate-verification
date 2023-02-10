const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connect } = require("./DB/connect");
const userRouter = require("./routes/userRoute");
const functions = require("firebase-functions");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.send("Welcome to Blockchain Certificate Storage Backend");
});

connect();

exports.app = functions.https.onRequest(app);
