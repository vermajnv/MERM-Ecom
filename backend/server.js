const app = require('./app');
const dotenv = require('dotenv')
const path = require('path');
const mongoConnect = require('./config/database');
const cloudinary = require('cloudinary');

// Handling uncaught exceptions
process.on("uncaughtException", (error) => {
    console.log(`Error : ${error.message}`);
    console.log("Sutting down the server due to uncaught Exception");
    process.exit(1);
})
// Config
dotenv.config({path : path.join(__dirname) + '/config/config.env'});

// Mongo connection
mongoConnect();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});

const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
})

// Capture Unhandled Rejection
process.on("unhandledRejection", (error) => {
    console.log(`Error : ${error.message}`);
    console.log(`Shutting down the server`);
    server.close(() => {
        process.exit(1);
    })
})