const debug = require("debug")("APP:SERVER");
const config = require("config");
const express = require("express");
const http = require("http"); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.set("port",process.env.PORT || config.get("port") );

http.createServer(app).listen(app.get("port"),()=>{
    debug(`${app.get('env')} server Started at port ${app.get("port")};Press Ctrl + C to stop it`);
});