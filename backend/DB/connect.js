const mongoose = require('mongoose');

const connect = () => {
    mongoose.set('strictQuery', false);
    let res = mongoose.connect('mongodb://localhost:27017/major_project', (err, conn) => {
        if (err) {
            console.log(err);
        }
        console.log('connected to db');
    });
};

module.exports = {
    connect
};