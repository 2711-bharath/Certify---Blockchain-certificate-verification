const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connect } = require("./DB/connect");
const userRouter = require("./routes/userRoute");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use("/user", userRouter);

app.listen(3000, async () => {
  console.log("listening to port 3000");
  await connect();
});
