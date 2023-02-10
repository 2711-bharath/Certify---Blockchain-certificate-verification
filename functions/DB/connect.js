const mongoose = require("mongoose");

const connect = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGO_URI, (err, conn) => {
    if (conn) {
      console.log("connected to db");
    } else if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  connect,
};
