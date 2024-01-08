//LIBRARIES
const express = require('express');
const cors = require('cors')

require('dotenv').config();

//ROUTES
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');

//CONFIG DATA BASE
require('./config/db');

//INSTANCE EXPRESS
const app = express();

//ALL ORIGINS
app.use(cors());

//POST -> JSON
app.use(express.json());

//USE ROUTE
app.use(productRouter);
app.use(userRouter);

//INIT SERVER
app.listen(process.env.PORT, () => {
    console.log(`server port: ${process.env.PORT}`)
})