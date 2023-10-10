// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer (word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let newWord = "";
function initialPrompt() {
   console.log("Let's play some scrabble!");
   newWord = input.question("Enter your word: ");
  // console.log(oldScrabbleScorer(newWord));
   return newWord
};

function simpleScorer(word) {
   word = word.toUpperCase();
   letterPoints = 0
   for (let x = 0; x<word.length; x++) {
      letterPoints +=1
   }
   return letterPoints
};

function vowelBonusScorer (word) {
   word = word.toUpperCase(); //case insensitive: ignore all cases when assigning points
   letterPoints = 0
   for (let x = 0; x < word.length; x++) {
      if (word[x] === 'A'|| word[x] === 'E'|| word[x] === 'I'|| word[x] === 'O'|| word[x] === 'U'|| word[x] === 'Y') {  //each vowel is assign 3 pts, take out Y
         letterPoints +=3
      } else {
        letterPoints +=1
      }
   }
   return letterPoints
};

function scrabbleScorer (word) {
	word = word.toLowerCase();
	let letterPoints = 0;
	for (x = 0; x <word.length; x++) {
		letterPoints += newPointStructure[word[x]]
	}
 
	return letterPoints
 };

let simpleScorerObject = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
};

let vowelBonusScorerObject = {
   name: 'Vowel Bonus',
   description: 'Vowels are 3 pts, consonants are 1 pt.',
   scorerFunction: vowelBonusScorer
};

let scrabbleScorerObject = {
   name: 'Scrabble',
   description: 'The traditional scoring algorithm.',
   scorerFunction: scrabbleScorer
};
  
const scoringAlgorithms = [simpleScorerObject, vowelBonusScorerObject, scrabbleScorerObject];

function scorerPrompt() {
     
     let promptAlgorithm = input.question("Enter a scoring algorithm of your choice: 0, 1, 2" + "\n" +
     "0 - Simple: One point per character" + "\n" +
     "1 - Vowel Bonus: Vowels are worth 3 points" + "\n" + 
     "2 - Scrabble: Uses scrabble point system" + "\n");
      console.log("algorithm name: ", scoringAlgorithms[promptAlgorithm].name);
      console.log("scorerFunction result: ", scoringAlgorithms[promptAlgorithm].scorerFunction(newWord));
}

function transform(object) {
   let newObject = {};
   for (key in object) { 
      for (x = 0; x < object[key].length; x++) {
      let newKey = object[key][x];
      newKey = newKey.toLowerCase();
      newObject[newKey] = Number(key);
      }

      }
      return newObject
};

let newPointStructure = transform(oldPointStructure);
console.log(newPointStructure)


function runProgram() {
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
