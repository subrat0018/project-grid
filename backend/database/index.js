const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const uri = "mongodb+srv://sibasisml:SbUO1rGOo6KMaifO@cluster0.mq993li.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri).then(
  () => {

    console.log("Connected to Mongo");
  },
  (err) => {
    console.log("error connecting to Mongo: ");
    console.log(err);
  }
);

module.exports = mongoose.connection;