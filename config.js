const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/SnakeGame"

mongoose.connect(url);

const SnakeGameSch = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  HighScore : Number
});

const collection = new mongoose.model("lists", SnakeGameSch);

module.exports = collection;
