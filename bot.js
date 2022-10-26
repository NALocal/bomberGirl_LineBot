require('dotenv').config();
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

// Bot 所監聽的 webhook 路徑與 port，heroku 會動態存取 port 所以不能用固定的 port，沒有的話用預設的 port 5000
bot.listen('/', process.env.PORT || 5000, function () {
    Log.LogDo(`Good morning ${myData.name}!`)
});