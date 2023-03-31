const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sgMail = require("@sendgrid/mail");

const { connect } = require("./DB/connect");
const userRouter = require("./routes/userRoute");
const certificateRoute = require("./routes/certificateRoute");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/certificate", certificateRoute);

app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    const msg = {
      to,
      from: "blueknight2711@gmail.com",
      subject,
      html,
    };
    await sgMail.send(msg);
    res.send("Email sent");
  } catch (err) {
    console.log(err);
    res.send("Sending email failed");
  }
});

app.listen(process.env.PORT || 3000, async () => {
  try {
    sgMail.setApiKey(process.env.SEND_GRID_API);
    console.log("listening to port " + (process.env.PORT || 3000));
    await connect();
  } catch (err) {
    console.log("Error in initializing app");
    console.log("🚀 ~ file: server.js:45 ~ app.listen ~ err:", err);
  }
});
