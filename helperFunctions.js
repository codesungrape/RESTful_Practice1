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

//Step 1:
// what are the options for price filters? - 5 and under, 10 and under,
// declare fuction
// for loop inside another function that checks the price filter
// isolate price variable and check against the filters
// return correct output that is filtered.

export async function getGamesByPrice(priceFilter) {
  try {
    // price filters are 5andUnder, 10andUnder, 15andUnder and 20andUnder
    const priceFilterOptions = {
      "5andUnder": 5,
      "10andUnder": 10,
      "15andUnder": 15,
      "20andUnder": 20,
    };

    //create other required variables
    const allGameData = await getAllGameObjects();
    const filteredGames = [];

    //check input format
    if (!priceFilter in priceFilterOptions) {
      return "Error!";
    }

    // if input format is correct run the code below
    let priceCeiling = priceFilterOptions[priceFilter];

    for (let game of allGameData) {
      if (game.price >= 0 && game.price <= priceCeiling) {
        filteredGames.push(game);
      } else if (game.price > 5 && game.price <= priceCeiling) {
        filteredGames.push(game);
      } else if (game.price > 10 && game.price <= priceCeiling) {
        filteredGames.push(game);
      } else if (game.price > 15 && game.price <= priceCeiling) {
        filteredGames.push(game);
      }
    }
    return filteredGames;
  } catch (error) {
    console.error("Error:", error);
  }
}

// const everythingUnder5 = await getGamesByPrice("5andUnder");
// console.log(everythingUnder5);
// console.log(everythingUnder5.length);
