import { readData } from "/Users/shantirai/Desktop/Projects/Practice_back-end/RESTful_project1/helperFunctions.js";
import express from "express";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON requests and make it available under req.body
app.use(express.json());

const PORT = 3000;

//Task 1 - Get all astronauts
// write a get reuest to endpoint and get all data
//Add an endpoint to your REST API which returns all astronauts in the response body.
// set up try catch block
// call the right helper function and save the output to a variable
// return the res.json(saidvariabe)

app.get("/", async function (req, res) {
  try {
    const allData = await readData();
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

// Start the server and listen on the defined port
app.listen(PORT, () => {
  // Log a message to the console when the server is successfully running
  console.log(`App listening at http://localhost:${PORT}`);
});
