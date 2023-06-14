const dbFunctions = require("./dbFunctions/dbFunctions");
const express = require("express");
const app = express();
const port = 5000;
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

// this is the words endpoint
// GET request
// It uses the dbfunction to call getRandomQuestions from the db functions.
// It returns 10 random questions
app.get("/quiz", async (req, res) => {
  try {
    let data = dbFunctions.getRandomQuestions();
    return res.status(200).send(data);
  } catch (err) {
    return res.status(400).send("Internal Server Error");
  }
});
//////////////////////////////////
// Rank endpoint it takes the correct answers in the request body
// it then send the number of correct answers to the get rank db function
// then it returns a object with the rank inside

app.post("/rank", async (req, res) => {
  let correctAnswers = req.body.answers;
  let rank = dbFunctions.getRank(correctAnswers.answers);
  let myNum = { num: rank };
  return res.status(200).send(myNum);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
