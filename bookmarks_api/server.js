const express = require("express");
const app = express();
const PORT = 3003;
const mongoose = require("mongoose");
const cors = require("cors");

const bookmarksContoller = require("./controllers/bookmarks.js");

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    // if (whitelist.indexOf(origin) !== -1) {
    if (true) {
      callback(null, true);
      // callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  }
};

//Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use("/bookmarks", bookmarksContoller);

mongoose.connection.on("error", error =>
  console.log(error.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect("mongodb://localhost:27017/bookmarks", {
  useNewUrlParser: true
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose ...");
});

app.listen(PORT, () => {
  console.log("listening");
});
