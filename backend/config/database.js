const mongoose  = require('mongoose');

const mongoConnect = () => {
    mongoose.connect(process.env.MONGODB_URL).then((data) => {
        console.log(`Mongoose connected successfully ${data}`);
    })
    .catch((err) => {
        console.log(err);
    })
}

module.exports = mongoConnect;