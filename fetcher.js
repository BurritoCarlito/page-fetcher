// makes a request to access the two libraries that were installed
const request = require("request");
const fs = require("fs");



// used to take in two arguments in node
const url = process.argv[2];
const localPath = process.argv[3];



/* a function that takes in to the two arguments 'url' and 'local path' */

const fetchAndSave = function (url, localPath) {
  request(url, (error, response, body) => {
    // makes a request to the server side, if it is an error it will log "failed to download resource and return the error"
    if (error) {
      console.log("Failed to download resource: ", error);
      return;
    }
    fs.writeFile(localPath, body, (error) => {
      if (error) {
        console.log("Failed to write to localPath: ", localPath);
      } else {
        console.log(
          `Downloaded and saved ${body.length} bytes to ${localPath}`
        );
      }
    });
  });
};

if (!url || !localPath) {
  console.log("Two parameters required...");
  console.log("Usage: node fetcher.js <url> <local-path>");
} else {
  fetchAndSave(url, localPath);
};