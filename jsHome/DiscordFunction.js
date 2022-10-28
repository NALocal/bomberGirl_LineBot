// 載入env變量
require('dotenv').config();
const myData = require('../jsonHome/myData.json');
const { Webhook } = require('discord-webhook-node');
const { ErrorDo } = require('./CatchFunction');
const hook = new Webhook(process.env.DISCORD_WEBHOOK);

exports.sendMessage = function(callback, message = myData.hello, name = myData.name, avatar = myData.avatar) {
    hook.setUsername(name);
    hook.setAvatar(avatar);
    hook.send(message)
        .then(() => {
            callback(true, "傳送訊息成功");
        })
        .catch((err) => {
            ErrorDo(err, "傳送訊息失敗");
        })
}

exports.sendImage = function(callback, image = "None", name = myData.name, avatar = myData.avatar) {
    try {
        if (image !== 'None') {
            hook.setUsername(name);
            hook.setAvatar(avatar);
            hook.sendFile(image);
        }
        callback(true, "傳送圖片成功");
    } catch (err) {
        ErrorDo(err, "傳送圖片失敗");
    }
}

exports.sendVideo = function(callback, video = "None", name = myData.name, avatar = myData.avatar) {
    try {
        if (video !== 'None') {
            hook.setUsername(name);
            hook.setAvatar(avatar);
            hook.sendFile(video);
        }
        callback(true, "傳送影音成功");
    } catch (err) {
        ErrorDo(err, "傳送影音失敗");
    }
}