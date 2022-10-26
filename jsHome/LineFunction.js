const Discord = require('./DiscordFunction.js');
const Log = require('./CatchFunction.js');
const PictureManager = require('./PictureManager.js');
const fs = require('fs');

exports.sendImageFromLine = async function(data) {
    event = data[0];
    userData = data[1];
    imageData = await event.message.content(event.message.id);
    imageBName = PictureManager.getImageSuffix(imageData);
    if (imageBName !== '') {
        await fs.writeFileSync(`./Image${imageBName}`, imageData);
        Discord.sendImage(Log.LogDo, `./Image${imageBName}`, `${userData.displayName} - FROM Line`, userData.pictureUrl);
    } else {
        Log.ErrorDo('未識別的圖片類型');
    }
}

exports.sendAudioFromLine = async function(data) {
    event = data[0];
    userData = data[1];
    audioData = await event.message.content(event.message.id);
    await fs.writeFileSync(`./Audio.mp3`, audioData);
    Discord.sendImage(Log.LogDo, `./Audio.mp3`, `${userData.displayName} - FROM Line`, userData.pictureUrl);
}