// import DataUriParser from "datauri/parser.js"
// import path from "path";

// const DataUriParser = require("datauri/parser.js");
// const path = require("path")

// const getDataUri = (file) => {
//     const parser = new DataUriParser();
//     const extName = path.extname(file.originalname).toString();
//     return parser.format(extName, file.buffer);
// }

// module.exports = getDataUri;

// utils/datauri.js


const DataUriParser = require('datauri/parser.js');
const path = require('path');

const getDataUri = (file) => {
  const parser = new DataUriParser();
  console.log('File object:', file);
  if (!file || !file.originalname) {
    console.error('File object is missing or does not have an originalname property');
    return null; // or throw an error
  }
  return parser.format(path.extname(file.originalname).toString(), file.buffer);
};

module.exports = getDataUri;
