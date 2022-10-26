// 載入env變量
require('dotenv').config();
const myData = require('../jsonHome/MyData.json');
const { Webhook } = require('discord-webhook-node');
const { ErrorDo } = require('./CatchFunction');
const hook = new Webhook(process.env.DISCORD_WEBHOOK);

exports.sendMessage = function(callback, message = myData.hello, name = myData.name, avatar = myData.avatar) {
    hook.setUsername(name);
    hook.setAvatar(avatar);
    hook.send(message)
        .then(() => {
            callback(true);
        })
        .catch((err) => {
            callback(false, err);
        })
}

exports.sendImage = function(callback, image = "None", name = myData.name, avatar = myData.avatar) {
    try {
        if (image !== 'None') {
            hook.setUsername(name);
            hook.setAvatar(avatar);
            hook.sendFile(image);
        }
        callback(true);
    } catch (err) {
        ErrorDo(err, "傳送圖片失敗");
        callback(false);
    }
}

exports.sendVideo = function(callback, video = "None", name = myData.name, avatar = myData.avatar) {
    try {
        if (video !== 'None') {
            hook.setUsername(name);
            hook.setAvatar(avatar);
            hook.sendFile(video);
        }
        callback(true);
    } catch (err) {
        ErrorDo(err, "傳送影音失敗");
        callback(false);
    }
}