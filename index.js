//LIBRARIES
const express = require('express');
require('dotenv').config();



// Instaciamiento de express
const app = express();




// Levantamiento de servidor
app.listen(process.env.PORT, () => {
    console.log(`Servidor conectado en puerto: ${process.env.PORT}`)
})