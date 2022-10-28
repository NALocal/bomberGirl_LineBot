// 載入env變量
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Log = require('./CatchFunction.js');
const myData = require('../jsonHome/myData.json');

const healthCheck = '/healthCheck';
const lineWebhook = '/linewebhook';
const port = 10000;

app.get('/',function (req,res){
    res.send('ok');
});

app.get(healthCheck,function (req,res){
    res.send('ok');
});

exports.start = function(linebotParser){
    app.post(lineWebhook,linebotParser);
    app.listen(process.env.PORT || port,function() {
        Log.LogDo(`Good morning ${myData.name}!`);
    });
}