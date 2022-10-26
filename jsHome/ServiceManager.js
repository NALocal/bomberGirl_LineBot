// 載入env變量
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const Log = require('./CatchFunction.js');
const myData = require('../jsonHome/myData.json');

const healthCheck = '/healthCheck';
const lineWebhook = '/linewebhook';
const port = 10000;

const parser = bodyParser.json({
verify: function (req, res, buf, encoding) {
    req.rawBody = buf.toString(encoding);
}
});

exports.start = function(linebotParse){
    app.post(lineWebhook,parser,linebotParse);
    app.get(healthCheck,function (req,res){
        res.send('<h1>This is find.</h1>');
    });
    app.listen(process.env.PORT || port,function(){
        Log.LogDo(`Good morning ${myData.name}!`);
    });
}