import fs from "fs/promises";

// recreate a copy od the data so the original is preserved ????

//FILE PATH
const path =
  "/Users/shantirai/Desktop/Projects/Practice_back-end/RESTful_project1/games.json";

// FUNCTION TO USE FS MODULE TO READ DATA FROM A JSON FILE AND RETURN IT AS AN ARRAY OF KEY/VALUE PAIRS
export async function readData() {
  try {
    const fileData = await fs.readFile(path, "utf8");
    const jsonData = JSON.parse(fileData);
    const allData = Object.entries(jsonData);
    return allData;
  } catch (error) {
    console.error("ERROR", error);
  }
}

//FUNCTION TO EXTRACT AND RETURN AN ARRAY OF GAME OBJECTS (SECOND ELEMENT OF EACH ENTRY IN THE DATA
export async function getAllGameObjects() {
  const allData = await readData();
  return allData.map((entry) => entry[1]);
}

/* SAVE RETURNED DATA OBJECT FROM getAllGameObjects() FOR FUTURE USE
Used in:
- getAllGameTitles
- getGameByTitle
- getGameByPrice
*/
const gameData = await getAllGameObjects();

// FUNCTION TO RETURN ONLY GAME TITLES
async function getAllGameTitles() {
  let titles = [];
  for (let key in gameData) {
    if (gameData.hasOwnProperty(key)) {
      titles.push(gameData[key].name);
    }
  }
  return titles;
}

// 1a. FUNCTION TO RETRIVE SINGLE GAME OBJECT FILTERED BY GAME TITLE INPUT
// 1b. FUNCTION TO SANITIZE 'TITLE' INPUT STRING

function sanitize(inputString) {
  return inputString.replace(/\s+/g, "").toLowerCase();
}

export async function getGameByTitle(title) {
  try {
    const sanitizedTitle = sanitize(title);
    const game = gameData.find(
      (game) => sanitize(game.name) === sanitizedTitle
    );
    return game || "Game not found";
  } catch (error) {
    console.error("Error:", error);
  }
}

console.log(await getGameByTitle("anarchy"));

// 1a. PRICE FILTER OPTIONS OBJECT
// 1b. FUNCTION TO RETURN GAMES FILTERED BY PRICE RANGE

const priceFilterOptions = {
  "5andUnder": 5,
  "10andUnder": 10,
  "15andUnder": 15,
  "20andUnder": 20,
};

export async function getGamesByPrice(priceFilter) {
  try {
    if (!priceFilter in priceFilterOptions) {
      return "Error!";
    }

    let priceCeiling = priceFilterOptions[priceFilter];

    const filteredGames = gameData.filter(
      (game) => game.price >= 0 && game.price <= priceCeiling
    );
    return filteredGames;
  } catch (error) {
    console.error("Error:", error);
  }
}

// // FUNCTION TO RETURN SCREENSHOT OF GAME IMAGE
// export async function getScreenshot() {
//   try {
//   } catch (error) {
//     console.error("No images found", error);
//   }
// }

// const screenshot = await getScreenshot("Anarchy");
// console.log(screenshot);

//get Game by genre
