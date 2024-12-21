import { read } from "fs";
import fs from "fs/promises";

export async function readData() {
  try {
    const fileData = await fs.readFile(
      "/Users/shantirai/Desktop/Projects/Practice_back-end/RESTful_project1/games.json",
      "utf8"
    );
    const jsonData = JSON.parse(fileData);
    return jsonData;
  } catch (error) {
    console.error("ERROR", error);
  }
}

const allData = await readData();
console.log(allData); //prints Promise { <pending> }
