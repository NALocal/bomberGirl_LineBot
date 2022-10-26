// 載入env變量
require('dotenv').config();
// 健康狀態
// require('./jsHome/healthCheck').start();
// 定時呼叫自己
require('./jsHome/cronTask.js').cronCallMysell();
const Log = require('./jsHome/CatchFunction.js');
const UserF = require('./jsHome/UserFunction.js');
const GroupF = require('./jsHome/GroupFunction.js');
const myData = require('./jsonHome/MyData.json');
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

// Bot 所監聽的 webhook 路徑與 port，process.env.PORT 是託管平台自帶的
bot.listen('/', process.env.PORT || 10000, function () {
    Log.LogDo(`Good morning ${myData.name}!`)
});