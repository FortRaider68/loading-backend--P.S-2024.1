const express = require("express");

const dotenv = require("dotenv");
dotenv.config({path:"./.env"});

const routes = require("./routes");

const App = express();

App.use(express.urlencoded({extended:false}));
App.use(routes);

const PORT = process.env.PORT_NODE;
App.listen(PORT,()=>{
    console.log(`Serving on 127.0.0.1:${PORT}`);
})