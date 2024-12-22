import fs from "fs/promises";

// recreate a copy od the data so the original is preserved.

// function to read and return all data
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

const data = await readData();

// returns an array with all game titles
function getAllGameTitles() {
  let titles = [];
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      console.log(key, data[key][0]);
      titles.push(data[key][0]);
    }
  }
  return titles;
}
console.log(getAllGameTitles());

//## Task 2 - Get a particular set of data AND add an endpoint to your REST API which returns a particular dataset in the response body- get back by name

export async function getGameByTitle(title) {
  // create vraibles lowercase
  title = title.toLowerCase().trim();

  // Loop through the array of games
  for (let i = 0; i < data.length; i++) {
    // for readability save the name value in its own variable
    let gameName = data[i][0];
    //sanitize data- remove whitespaces and make lowercase
    let sanitized = gameName.replace(/\s+/g, "").toLowerCase();

    // check all entries in the data array for lowerCase() matches
    if (sanitized === title) {
      // if match found, return that isolated object

      return data[i];
    }
  }

  // else return no object found with that title
  return "Error, please check input.";
}

console.log(getGameByTitle("TwoWeeksinPainland"));
