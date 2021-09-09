const express = require('express');
const bodyParser = require('body-parser');


// Inti App
const app = express();

// Body-parser
app.use(bodyParser.json());


//listen to server
app.on('listening',function(){
    console.log('ok, server is running');
});
app.listen(3000);


