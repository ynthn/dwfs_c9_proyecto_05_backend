const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB).then(() => console.log('Base de datos conectada con exito!'))