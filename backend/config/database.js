const mongoose  = require('mongoose');

const mongoConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        // useNewUrlParser : true
    }).then((data) => {
        console.log(`Mongoose connected successfully ${data.connection.host}`);
    }) 
}

module.exports = mongoConnect;