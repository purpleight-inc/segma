const debug = require("debug")("APP:SERVER");
const config = require("config");
const express = require("express");
const http = require("http"); 
const mongoose = require("mongoose");

mongoose.connect(config.get("mongoose.url"),config.get("mongoose.options"),()=>{
    debug(`mongoose connected at ${config.get("mongoose.url")}`)
});
mongoose.set('useCreateIndex', true);

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.set("port",process.env.PORT || config.get("port") );

app.use('/api/user',require("./routes/user"));
app.use('/api/supplier',require("./routes/supplier"));
app.use('/api/product-entry',require("./routes/productEntry"));
app.use('/api/product',require("./routes/product"));
app.use('/api/order',require("./routes/order"));
app.use('/api/category',require("./routes/category"));

http.createServer(app).listen(app.get("port"),()=>{
    debug(`${app.get('env')} server Started at port ${app.get("port")};Press Ctrl + C to stop it`);
});