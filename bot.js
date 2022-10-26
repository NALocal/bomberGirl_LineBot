// 載入env變量
require('dotenv').config();
// 定時呼叫自己
require('./jsHome/CronTask.js').cronCallMysell();
// 伺服器&健康狀態
const serviceManager = require('./jsHome/ServiceManager.js');
const UserF = require('./jsHome/UserFunction.js');
const GroupF = require('./jsHome/GroupFunction.js');
const myData = require('./jsonHome/myData.json');

const linebot = require('linebot');

// 用於辨識Line Channel的資訊
const bot = linebot({
    channelId: process.env.LINE_CHANNEL_ID,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

// 當有人傳送訊息給 Bot 時
bot.on('message', function (event) {
    // 測試用代碼，開發人員可自行調整 MasterID 以利於 debugger
    if (event.source.userId === myData.MasterID) {
        console.log('OnMessage');
        console.log(event);
    }
    switch (event.source.type) {
        case "group":
            GroupF.DoLineGroupFunction(event);
            break;
        case "user":
            UserF.DoLineUserFunction(event);
            break;
    }
});

serviceManager.start(bot.parser());