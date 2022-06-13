const mongoose  = require('mongoose');

const mongoConnect = () => {
    mongoose.connect(process.env.MONGODB_URL).then((data) => {
        console.log(`Mongoose connected successfully ${data.connection.host}`);
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = mongoConnect;