import {
  readData,
  getAllGameObjects,
  getGameByTitle,
  getGamesByPrice,
  sortGames,
  getScreenshotByGameName,
  deleteKeyValues,
} from "/Users/shantirai/Desktop/Projects/Practice_back-end/RESTful_project1/helperFunctions.js";
import express from "express";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and make it available under req.body for POST or PUT requests
app.use(express.json());

// PORT
const PORT = 3000;

// 1. HANDLE GET REQUEST FOR ALL DATA API ENDPOINT
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
app.get("/games/sort", async (req, res) => {
  try {
    const { ascOrDesc } = req.query;
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

// GET REQUEST TO RETURN SCREENSHOT IMAGE
// 1. setup route handler with endpoint
// 2. setup try catch block
//    - save the param in req inside a variable
//    - call getScreenshot(re.param)
//    - if no param return error msg
//    - return right image in payload
app.get("/screenshot/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const gameScreenshot = await getScreenshotByGameName(name);

    if (!name || !gameScreenshot) {
      res.status(400).json({
        success: false,
        message: "Invalid inputs, please check.",
      });
    }
    res.redirect(gameScreenshot);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
    });
  }
});

// USING REQ.METHOD TO SEE HTTP METHOD USED FOR THE REQUEST
app.all("/check", async (req, res) => {
  res.send(`Request method used: ${req.method}`);
});

// DELETE ROUTE REQUEST TO DELETE ALL OBJECT KEYS AND RETURN NEW ARRAY OF OBJECTS.
// 1. set up route route with endpoint
// 2. set try catch block
//  - save variable from req.body to variable
//  - use the corerct helperFunction
//  - return the deleted item
app.delete("/games/key/:keyName", async (req, res) => {
  try {
    const keyName = req.params.keyName;
    if (!keyName) {
      res.status(400).json({
        success: false,
        message: "Invalid keyName. Please check your input.",
      });
    }
    const allGames = await getAllGameObjects();
    const modifiedData = await deleteKeyValues(keyName, allGames);
    // Handle empty results
    if (!modifiedData || modifiedData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No matching keys found for deletion.",
      });
    }

    //success repsonse
    res.status(200).json({
      success: true,
      payload: modifiedData,
    });
  } catch (error) {
    console.error("Error deleting key-value pairs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
});

// now that i know there is a differnce between req.query vs req.params and im a little comfortable wiht what re.params are, need to do a req.query request.

// Start the server and listen on the defined port
app.listen(PORT, () => {
  // Log a message to the console when the server is successfully running
  console.log(`App listening at http://localhost:${PORT}`);
});
