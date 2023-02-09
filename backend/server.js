const express = require("express");
import dotenv from "dotenv";
import cors from "cors";
const { connect } = require("./DB/connect");
const userRouter = require("./routes/userRoute");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Blockchain Certificate Storage Backend");
});

app.listen(process.env.PORT || 3000, async () => {
  console.log("listening to port 3000");
  await connect();
});
