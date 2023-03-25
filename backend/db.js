const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectToMongo = () => {

    mongoose.connect("mongodb+srv://admin-sapan:Z6diUAFVizX2FT8@cluster0.vzoukul.mongodb.net/inotes", (err) => {
        if (err)
            console.log(`Unable to connect to the server : ${err}`);
        else
            console.log('Connected to Mongo Successfully');
    });
};
module.exports = connectToMongo;