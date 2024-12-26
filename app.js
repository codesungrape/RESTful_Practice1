import {
  readData,
  getAllGameObjects,
  getGameByTitle,
  getGamesByPrice,
  sortGames,
  //getScreenshot,
} from "/Users/shantirai/Desktop/Projects/Practice_back-end/RESTful_project1/helperFunctions.js";
import express from "express";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and make it available under req.body
app.use(express.json());

const PORT = 3000;

// 1. HANDLE GET REQUEST FOR ALL DATA API ENDPOINT
// listen for incoming GET requests on the root ('/') route
// setup try catch block
// when a GET request is made, use the ASYNC helper function getAllGameObjects() get the data from database
// if !allData, throw error message
// after fetching the data, send it back to client as JSON response with 200 status response
// or catch error with 500 status

app.get("/", async function (req, res) {
  try {
    const allData = await getAllGameObjects();

    if (!allData) {
      res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    res.status(200).json({
      success: true,
      payload: allData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
});

// 2 - HANDLE GET REQUEST FOR SPECIFIC GAME BY NAME PARAMETER
// listen for incoming GET request on the "/game/:name" endpoint route
// setup try catch block
// extract the request.param to a variable to use with appropriate helperFunction
// when a GET request is made, use the ASYNC helper function getGameByTitle() get the data from database
// if no data is returned, throw error message
// after fetching the data, send it back to client as JSON response with 200 status response
// or catch error with 500 status

app.get("/game/:name", async function (req, res) {
  try {
    const { name } = req.params;
    const gameDataByName = await getGameByTitle(name);

    if (gameDataByName === "Error, please check input.") {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    res.status(200).json({
      success: true,
      payload: gameDataByName,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
});

// 3 - HANDLE REQUEST FOR SPECIFIC PRICE POINTS BY PRICEFILTER PARAMETER
//     Example URL: http://localhost:3000/price/filter?priceFilter=5andUnder

// 1. Set up route handler for GET /price/filter
// 2. Extract price range from query parameters (req.query)
// 3. Validate price parameters (ensure they're correct object key)
// 4. Try-catch block:
//    Try:
//      - Call async getGamesByPrice(minPrice, maxPrice)
//      - If games found, return 200 with games data
//      - If no games found, return 404 with "No games found" message
//    Catch:
//      - Log the error
//      - Return 500 with error message

app.get("/price/:priceFilter", async function (req, res) {
  try {
    const priceFilter = req.params.priceFilter;

    const priceFilterOptions = {
      "5andUnder": 5,
      "10andUnder": 10,
      "15andUnder": 15,
      "20andUnder": 20,
    };

    if (!priceFilter || !priceFilterOptions[priceFilter]) {
      return res.status(400).json({
        success: false,
        message: "Invalid price filter option",
      });
    }

    const filteredResults = await getGamesByPrice(priceFilter);

    if (filteredResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No games found within the price range",
      });
    }

    res.status(200).json({
      success: true,
      payload: filteredResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
});

// HANDLE REQUEST FOR GET GAME BY MIN TO MAX AND VICE VERSA
//     keyword can only be 'asc or 'desc'

// 1. Set up route handle for get /price/AscOrDesc
// 2. Extract paramenter from the req.query (re.param)
// 3. Set up Try-catch block:
//   - Try:
//      - call async sortGames(req.param, data)
//      - If no param of data, return 404 with "No games found" message
//      - If games found, return 200 with games data in asc or des order
//   - Cacth:
//      - Log the error
//      - Return 500 with error message

app.get("/price/:AscOrDesc", async (req, res) => {
  try {
    const ascOrDesc = req.params.AscOrDesc;
    const data = await getAllGameObjects();
    const sortedData = await sortGames(ascOrDesc, data);

    if (!ascOrDesc || !sortedData) {
      res.status(400).json({
        success: false,
        message: "Invalid inputs, please check.",
      });
    }

    res.status(200).json({
      success: true,
      payload: sortedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
});

// 1. Set up route handler for GET /price/filter
// 2. Extract price range from query parameters (req.query)
// 3. Validate price parameters (ensure they're correct object key)
// 4. Try-catch block:
//    Try:
//      - Call async getGamesByPrice(minPrice, maxPrice)
//      - If games found, return 200 with games data
//      - If no games found, return 404 with "No games found" message
//    Catch:
//      - Log the error
//      - Return 500 with error message

/*

const gameChosen = getGameByTitle();

// declare app.get with URL endpoint
// try catch block
// save the params to the req body to be used
// call the right function
// add checking mechanisms and error msg
// res.json the right image

app.get("/images/{gameName}", async (req, res) => {
  try {
    const gameName = req.query.gameName;
    const image = await getScreenshot(gameName);

    if (!image || !gameName) {
      return res.status(400).json({
        success: false,
        message: "Invalid input or image not found",
      });
    }
    res.status(200).json({
      success: true,
      payload: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
});

*/

// Start the server and listen on the defined port
app.listen(PORT, () => {
  // Log a message to the console when the server is successfully running
  console.log(`App listening at http://localhost:${PORT}`);
});
