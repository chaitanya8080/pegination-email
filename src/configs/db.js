const mongoose = require('mongoose');


const connection = `mongodb+srv://chaitanya:girase123@cluster0.dypcc.mongodb.net/pegination?retryWrites=true&w=majority`
module.exports = () => { 
    return mongoose.connect(connection);
};
