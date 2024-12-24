import fs from "fs/promises";
import { get } from "http";

// recreate a copy od the data so the original is preserved.

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
export async function getGameObjectData() {
  const allData = await readData();
  let gamesObjects = [];
  allData.forEach((entry) => {
    // isolate the second element and push it into the gamesObjects array
    const secondElement = entry[1];
    gamesObjects.push(secondElement);
  });
  return gamesObjects;
}

const gameObjData = await getGameObjectData();
console.log(gameObjData);

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

/*

//## Task 2 - Get a particular set of data via TTILE AND add an endpoint to your REST API which returns a particular dataset in the response body- get back by name

export async function getGameByTitle(title) {
  title = title.toLowerCase().trim();

  for (let i = 0; i < data.length; i++) {
    let gameName = data[i][0];

    let sanitized = gameName.replace(/\s+/g, "").toLowerCase();

    // check all entries in the data array for lowerCase() matches
    if (sanitized === title) {
      // if match found, return that isolated object whole or only bring back the object with key Value pairs?
      return data[i][1];
    }
  }

  // else return no object found with that title
  return "Error, please check input.";
}

const anarchy = await getGameByTitle("anarchy");
// access the genres array to see the output- is it just [Array] or will it give me the values inside array?
console.log(Object.keys(anarchy).length); //returns 0

// access the second part of the returned object anarchy[i][1] and find the 'genres' categories and return the values in there
const anarchyObjOnly = anarchy[1];
console.log(anarchyObjOnly);

let categories;
for (let key in anarchyObjOnly) {
  if (key === "categories") {
    categories = anarchyObjOnly[key];
  }
}

console.log("categories:", categories);

//## Task 2 - Get a particular set of data OS AND add an endpoint to your REST API which returns a particular dataset in the response body- get back by name



*/
