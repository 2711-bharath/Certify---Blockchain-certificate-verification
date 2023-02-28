const mongoose = require("mongoose");

const connect = () => {
  mongoose.set("strictQuery", false);
  let res = mongoose.connect(
    "mongodb+srv://Team14:team14abc@team14.qgldcll.mongodb.net/major_project?retryWrites=true&w=majority",
    (err, conn) => {
      if (conn) {
        console.log("connected to db");
      } else if (err) {
        console.log(err);
      }
    }
  );
};

module.exports = {
  connect,
};
