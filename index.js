require('dotenv').config(); // configuring dotenv package to  server for loading env vaariables to process.env
const express = require('express'); //importing express
const cors = require('cors')
const router =require('./Routes/routes')
require('./Connection/dbConnection')

const server = express(); //creating a server app
server.use(cors()) //cors() returns cors middleware and use configures it 
server.use(express.json()); //configuring json middleware to convert json data format to native
server.use(router);
server.use('/images', express.static('./uploads'))

const PORT = 3000 || process.env.PORT; //env variable if PORT 3000 is not avilable

server.listen(PORT, () => { //For making server run and wait for requests
    console.log('server running at :', PORT);
});
