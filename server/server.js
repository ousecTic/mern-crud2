const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./DB");

//routes

const commentRoutes = require("./routes/commentRoutes");

//use

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/comments", commentRoutes);

//database connections

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log(`Database wasn't able to connect ${err}`);
  }
);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
