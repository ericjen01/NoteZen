require('dotenv').config();

const PORT = process.env.PORT; 

console.log("config.js > mongo_uri: ", process.env.NODE_ENV)
 
const MONGO_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI;

module.exports = { MONGO_URI, PORT };