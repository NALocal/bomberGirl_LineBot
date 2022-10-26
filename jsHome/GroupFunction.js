const Log = require('./CatchFunction.js');
const Line = require('./LineFunction.js');
const Discord = require('./DiscordFunction.js');

exports.DoLineGroupFunction = async function (event) {
    let data = "";
    let userData = await event.source.profile();
    switch (event.message.type) {
        case 'text':
            Discord.sendMessage(Log.LogDo, event.message.text, `${userData.displayName} - FROM Line`, userData.pictureUrl);
            break;
        case 'image':
            data = [event, userData];
            Line.sendImageFromLine(data);
            break;
        case 'audio':
            data = [event, userData];
            Line.sendAudioFromLine(data);
            break;
    }
}