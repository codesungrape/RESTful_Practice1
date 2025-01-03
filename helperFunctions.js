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
const cachedGameData = await getAllGameObjects();

// FUNCTION TO RETURN ONLY GAME TITLES IN DATASET
async function getAllGameTitles(data = cachedGameData) {
  const titles = [];
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      titles.push(data[key].game_name);
    }
  }
  return titles;
}

// 1a. FUNCTION TO RETRIVE SINGLE GAME OBJECT FILTERED BY GAME TITLE INPUT
// 1b. FUNCTION TO SANITIZE 'TITLE' INPUT STRING
function sanitize(inputString) {
  if (!inputString) return "";

  if (typeof inputString !== "string") {
    console.error("Expected a string but got:", typeof inputString);
    return ""; // Return a default value if inputString is not a string
  }

  return inputString.replace(/\s+/g, "").toLowerCase();
}

export async function getGameByTitle(title) {
  try {
    const sanitizedTitle = sanitize(title);
    const game = cachedGameData.find(
      (game) => sanitize(game.name) === sanitizedTitle
    );
    return game || "Game not found";
  } catch (error) {
    console.error("Error:", error);
  }
}

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

    let priceMaxRange = priceFilterOptions[priceFilter];
    const filteredGames = cachedGameData.filter(
      (game) => game.price >= 0 && game.price <= priceMaxRange
    );

    return filteredGames;
  } catch (error) {
    console.error("Error:", error);
  }
}

// FUNCTION TO RETURN ALL GAMES SORTED ASCENDING AND DESCENDING
export async function sortGames(keyword, data = cachedGameData) {
  /*keyword can only be 'asc or 'desc' */

  let sanitizedKeyword = sanitize(keyword);

  const sortAscending = [...data].sort((a, b) => a.price - b.price);
  const sortDescending = [...data].sort((a, b) => b.price - a.price);

  if (sanitizedKeyword === "asc") {
    return sortAscending;
  } else {
    return sortDescending;
  }
}

// FUNCTION TO RETURN RANDOM SCREENSHOT OF SPECIFIED GAME
export async function getScreenshotByGameName(game) {
  try {
    const gameData = await getGameByTitle(game);
    if (!gameData || gameData === "Game not found") {
      return "No game data found!";
    }

    const screenshots = gameData.screenshots;
    if (!screenshots) {
      return "No screenshots available!";
    }

    return screenshots[Math.floor(Math.random() * screenshots.length)];
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred while fetching the screenshot.";
  }
}

// FUNCTIONS TO RETURNS GAME BY TAG/S SELECTED
export async function getGameByTag(data = cachedGameData, [...tag]) {
  try {
    const result = [];
    cachedGameData.filter((game) => {
      if (Object.keys(game.tags).map(sanitize).includes(sanitize(tag))) {
        result.push(game);
      }
    });
    return result;
  } catch (error) {
    console.error("No games found - sorry!", error);
    return [];
  }
}

// FUNCTION TO DELETE KEY-VALUE PARIS IN OBJECTS INSIDE AN ARRAY
export async function deleteKeyValue(data = cachedGameData, keyName) {
  const modifiedData = data.map((game) => {
    const gameCopy = { ...game };
    if (keyName in gameCopy) {
      delete gameCopy[keyName];
    }
    return gameCopy;
  });
  return modifiedData;
}

// FUNCTION TO DELETE MULTIPLE KEY-VALUE PARIS IN OBJECTS INSIDE AN ARRAY
export async function deleteMultipleKeyValues(
  data = cachedGameData,
  ...keyNames
) {
  const modifiedData = data.map((game) => {
    // // Create copy to avoid mutating original
    const gameCopy = { ...game };
    keyNames.forEach((key) => {
      if (key in gameCopy) {
        delete gameCopy[key];
      }
    });
    return gameCopy;
  });
  return modifiedData;
}

// FUNCTION TO CHECK IF NEW DATA OBJECT HAS REQUIRED KEYS AND RETURN NEW OBJECT
// NEW GAME OBJECT TO USE
export async function createNewGameObject(gameObject) {
  const requiredTemplate = {
    game_name: "",
    release_date: "",
    price: 0,
    short_description: "",
    developers: [],
    publishers: [],
    categories: [],
    genres: [],
    screenshots: [],
    tags: [],
  };

  let newGameObject = {};

  for (const key in requiredTemplate) {
    if (!(key in gameObject)) {
      throw new Error(`Missing key: ${key}`);
    } else {
      newGameObject = { ...gameObject };
    }
  }
  return newGameObject;
}
const gameObject = {
  game_name: "CyberQuest",
  release_date: "2023-11-15",
  price: 19.99,
  short_description:
    "An action-packed sci-fi RPG where players explore alien worlds.",
  developers: ["Galactic Studios"],
  publishers: ["Nova Games"],
  categories: ["Single-player", "Multiplayer", "Co-op"],
  genres: ["Action", "RPG", "Adventure"],
  screenshots: [
    "https://example.com/screenshot1.jpg",
    "https://example.com/screenshot2.jpg",
  ],
  tags: ["Sci-fi", "Exploration", "Open World", "Story Rich"],
};

//FUNCTION TO ADD CREATED NEW OBJECT TO DATABASE
export async function addGameObject(newObjData, data = cachedGameData) {
  const newGameObj = await createNewGameObject(newObjData);
  const database = data;

  if (!newGameObj || !database) {
    throw new Error("Invalid input: newGameObj or database is missing");
  }
  database.push(newGameObj);
  return database;
}
