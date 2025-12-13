const mongoose = require("mongoose");

const connectToBb = () => {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("connected to the database");
    })
    .then((err) => {
      if (err) {
        console.log(err);
      }
    });
};

module.exports = connectToBb;
