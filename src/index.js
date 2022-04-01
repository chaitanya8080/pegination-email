const express = require('express');

const connect = require('./configs/db');
const userController = require('./controllers/user.controller');
const adminController = require('./controllers/admin.controller');
const app = express();

app.use(express.json());
app.use('/users',userController);
app.use('/admin',adminController);



app.listen(7222,async () => {
    try {
        
        await connect();
        console.log(`listening on port 7222`);
    } catch (error) {
        console.log(error);
    }
})
