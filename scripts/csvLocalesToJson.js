const fs = require("fs");
const csvParser = require("csv-parser");

const inputFile = "translation.csv"; // Replace this with your CSV file path

const czJson = {};
const uaJson = {};

fs.createReadStream(inputFile)
	.pipe(csvParser({ separator: ",", headers: false }))
	.on("data", (row) => {
		const key = row[0];
		if (!key) {
			return;
		}

		const czValue = row[2];
		const uaValue = row[3];

		czJson[key] = czValue;
		uaJson[key] = uaValue;
	})
	.on("end", () => {
		fs.writeFileSync("cz_output.json", JSON.stringify(czJson, null, 2));
		fs.writeFileSync("ua_output.json", JSON.stringify(uaJson, null, 2));
		console.log("JSON files generated successfully!");
	})
	.on("error", (error) => {
		console.error("An error occurred while processing the CSV file:", error);
	});
