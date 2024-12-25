import fs from "fs/promises";
import { get } from "http";

// recreate a copy od the data so the original is preserved ????

// Return all data
// Part 1 of 2: function to read and return all data
export async function readData() {
  try {
    const fileData = await fs.readFile(
      "/Users/shantirai/Desktop/Projects/Practice_back-end/RESTful_project1/games.json",
      "utf8"
    );
    // convert a JSON string into a JS object
    const jsonData = JSON.parse(fileData);

    // Return an array of the key/value pairs of an object as an array is easier to manage
    const allData = Object.entries(jsonData);

    return allData;
  } catch (error) {
    console.error("ERROR", error);
  }
}

// Part 2 of 2: create a function to return the data that i need aka the second element in the readData() result
export async function getAllGameObjects() {
  const allData = await readData();
  let gamesObjects = [];
  allData.forEach((entry) => {
    // isolate the second element and push it into the gamesObjects array
    const secondElement = entry[1];
    gamesObjects.push(secondElement);
  });
  return gamesObjects;
}

// Helper function that returns an array with all game titles
function getAllGameTitles() {
  let titles = [];
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      titles.push(data[key][0]);
    }
  }
  return titles;
}
[
  "Galactic Bowling",
  "Train Bandit",
  "Jolt Project",
  "Henosis",
  "Two Weeks in Painland",
  "Kooring VR Coding Adventure",
  "Anarchy",
  "Dark Throne",
];

//## Task 2 - Get a particular set of data via TTILE AND add an endpoint to your REST API which returns a particular dataset in the response body- get back by name

export async function getGameByTitle(title) {
  try {
    //sanitize input string
    title = title.replace(/\s+/g, "").toLowerCase();
    console.log(title);

    const gamesObj = await getAllGameObjects();

    // use a looping mechanism if sanitized object.name === sanitized input title, return that object or retunr error msg
    for (let game of gamesObj) {
      // find the game title in object
      console.log(game.name);
      if (game.name.replace(/\s+/g, "").toLowerCase() === title) {
        return game;
      }
    }
    return "Game not found";
  } catch (error) {
    console.error("Error:", error);
  }
}

//## Task 3 - Get a particular set of data by PRICE  and etunrns filtered data via games prices.
// AND add an endpoint to your REST API which returns a particular dataset in the response body- get back by name

//Step 1: check access to game price
// declare a container for all games data  by calling the function and saving it to data
// lets find price- console.log for loop checking price of each game
const allGames = await getAllGameObjects();
console.log(allGames.length);
for (let game of allGames) {
  console.log(typeof game.price, game.price);
}

//Step 2:
// what are the options for price filters? - 5 and under, 10 and under,
// declare fuction
// for loop
// isolate price variable and check against the filters
