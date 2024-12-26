import {
  readData,
  getAllGameObjects,
  getGameByTitle,
  getGamesByPrice,
  //getScreenshot,
} from "/Users/shantirai/Desktop/Projects/Practice_back-end/RESTful_project1/helperFunctions.js";
import express from "express";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and make it available under req.body
app.use(express.json());

const PORT = 3000;

//Task 1 - Get all data
// write a get reuest to endpoint and get all data
//Add an endpoint to your REST API which returns all astronauts in the response body.
// set up try catch block
// call the right helper function and save the output to a variable
// return the res.json(saidvariabe)

app.get("/", async function (req, res) {
  try {
    const allData = await getGameObjectData();
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

//## Task 2 - Get a particular set of data AND add an endpoint to your REST API which returns a particular dataset in the response body- get back by name
// write a get request to endpoint - /:id or /:name
// set up try catch block
// call the right helper function and save the output to a variable
// return the res.json(saidvariabe)

app.get("/game/:name", async function (req, res) {
  try {
    // save the request to a variable
    const { name } = req.params;

    const gameDataByName = await getGameByTitle(name);

    // Check if gameDataByName is an error message or valid data
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

// TASK 3: Get a particular set of data (get games by price filter) AND add an endpoint to your REST API which returns a particular dataset in the response body- get back by name

// set up the GET statemnt with end point
// ASYNC ( req, res ) => {}
// setup the try catch block
// extract the query string from the req.body and save to a variable
// use the right function with query string as the argument and AWAIT as it is an async fucntion
// return the res.status and res.json in correct format.

/* Valid Price Filter Options 
const priceFilterOptions = {
    "5andUnder": 5,
    "10andUnder": 10,
    "15andUnder": 15,
    "20andUnder": 20,
  };
*/

app.get("/filter", async function (req, res) {
  // Price filter options are passed as query parameters.
  // Example URL: http://localhost:3000/filter?priceFilter=5andUnder

  try {
    const priceFilter = req.query.priceFilter;
    console.log(priceFilter);

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

    //fetch and save results
    const filteredResults = await getGamesByPrice(priceFilter);

    // Check if no results
    if (filteredResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No games found within the price range",
      });
    }

    //return successful response
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

// TASK 4. GET REQUEST FOR GAME IMAGES BY GAMENAME
// listen for GET on '/:id/
// extract 'id' and fetch game data with getGameByTitle()
// create a separate fucntion which extracts the image from the return of getGameByTitle()?
// returns a particular random game image in the response body.

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

// Start the server and listen on the defined port
app.listen(PORT, () => {
  // Log a message to the console when the server is successfully running
  console.log(`App listening at http://localhost:${PORT}`);
});
