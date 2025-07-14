const mongoose = require('mongoose');

mongoose.connect(process.env.DBCONNECT).then((response) => {
    console.log('Server connnected with MongoDb-Atlas');
}).catch((error) => console.log(error))