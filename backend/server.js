const app = require('./app');
const dotenv = require('dotenv')
const path = require('path');

// Config

dotenv.config({path : path.join(__dirname) + '/config/config.env'});
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
})