const express = require('express');
const restful = require('node-restful');
const server = express();
const mongoose = restful.mongoose
const bodyParser = require('body-parser');
const cors = require('cors');

// database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb');

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cors());

//ODM
const Cliente = restful.model('Cliente', {
    name: {type: String, required: true}
});

// Rest API
Cliente.methods(['get','post','put','delete']);
Cliente.updateOptions({new: true, runValidators: true});

// Routes
Cliente.register(server, '/clientes');

server.listen(3000, function(){
    console.log('Server ON');
})