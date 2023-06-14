const testData = require("./TestData.json");

function getRandomWordByPos(pos) {
  // function that takes pos and returns a random word from the wordlist from this pos
  let wordList = testData.wordList; // this is the word list stored in the wordList variable
  let wordFilter = wordList.filter((word) => word.pos === pos); // filtering the wordList by the pos and storing it in the wordFilter variable
  let randomNo = Math.floor(Math.random() * wordFilter.length); // making a random number using the length of the wordFilter
  return wordFilter[randomNo]; // returning the word
}

function getRandomQuestions() {
  let randomObjects = []; // array to store the questions objects
  let map1 = new Set(); // declaring a new hashset which will store all the numbers that was used before to make sure there is no duplicate questions
  var typeSet = new Set();
  let pos = ["noun", "adverb", "adjective", "verb"];
  let counter = 0;
  for (let i = 0; randomObjects.length < 10; i++) {
    // this loop stops untill the size of the array is 10
    let randNo = Math.floor(Math.random() * 14); // getting a random number between 0 to 13

    if (map1.has(testData.wordList[randNo].id)) {
      // if the number was already inside the map1 then the loop will be skipped
      continue;
    } else {
      map1.add(testData.wordList[randNo].id); // adding the number used to hashset so that next time it would not be added again
      randomObjects.push(testData.wordList[randNo]); // pushing the question object to the array
      typeSet.add(testData.wordList[randNo].pos);
      counter++;
    }

    if (counter > 7 && typeSet.size < 4) {
      pos.forEach((element) => {
        // looping over all the types of pos and checking if each one has been added or no using the typeSet (hashset)
        if (!typeSet.has(element)) {
          let missingPos = getRandomWordByPos(element); //getting a random word with the same pos that is missing using the function
          map1.add(missingPos.id); // adding the number used to hashset so that next time it would not be added again
          randomObjects.push(missingPos); // pushing the question object to the array
          typeSet.add(element);
          counter++;
        }
      });
    }
  }

  return randomObjects;
}

function getRank(score) {
  let scoreList = testData.scoresList; // storing my test score list from the json into the score list array
  scoreList.sort((a, b) => a - b); // sorting the number inside the array ascendingly to make it easy to count all the number below the user's score
  score = score * 10; // multiplying the user's score by 10 to get the percentage
  let counter = 0; // declaring a new counter variable to store the number of scores below user's score
  for (let i = 0; i < scoreList.length; i++) {
    // looping over the array till we reach a number bigger than the user's score

    if (scoreList[i] < score) {
      counter++; // adding to the score until there a number bigger than the user's score then the loop will break
    } else {
      break;
    }
  }
  let rank = (counter / scoreList.length) * 100; // calculating the rank
  rank = Math.round(100 * rank) / 100; //rounding the answer to nearest hundred using the mathround library
  return rank;
}

module.exports = {
  getRank,
  getRandomQuestions,
};
