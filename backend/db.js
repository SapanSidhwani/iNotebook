const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectToMongo = () => {

    mongoose.connect("mongodb://127.0.0.1:27017/inotes", (err) => {
        if (err)
            console.log(`Unable to connect to the server : ${err}`);
        else
            console.log('Connected to Mongo Successfully');
    });
};
module.exports = connectToMongo;