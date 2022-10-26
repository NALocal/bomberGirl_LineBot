const prefixData = require('../jsonHome/prefix.json');
const bomberGirlD = require('../jsonHome/bomberGirlData.json');

exports.DoLineUserFunction = function (event, lineData = "") {
    if (event.message.type !== 'text') return false;
    const userMessage = event.message.text;
    let tempPrefix = '-1';
    const prefixED = Object.keys(prefixData);
    prefixED.forEach(element => {
        if (userMessage.substring(0, prefixData[element].value.length) === prefixData[element].value) {
            tempPrefix = element;
        }
    })

    switch (tempPrefix) {
        case '0':
            UserHelpFunction(event, userMessage, tempPrefix);
            break;
        case '1':
            UserMenuFunction(event, userMessage, tempPrefix);
            break;
    }
}

function UserHelpFunction(event, userMessage, tempPrefix) {
    let messageObject;
    const args = userMessage.substring(prefixData[tempPrefix].value.length, userMessage.length);
    switch (args.trim()) {
        case 'help':
            messageObject = '查詢角色資料 !\n!bomber\n!attacker\n!shooter\n!blocker'
            event.reply(messageObject);
            break;
    }
}

function UserMenuFunction(event, userMessage, tempPrefix) {
    let messageObject;
    const args = userMessage.substring(prefixData[tempPrefix].value.length, userMessage.length);
    switch (args.trim()) {
        case "bomber":
            messageObject = getBombersImageUrl(bomberGirlD.bomber);
            break;
        case "attacker":
            messageObject = getBombersImageUrl(bomberGirlD.attacker);
            break;
        case "shooter":
            messageObject = getBombersImageUrl(bomberGirlD.shooter);
            break;
        case "blocker":
            messageObject = getBombersImageUrl(bomberGirlD.blocker);
            break;

    }
    const message = {
        "type": "template",
        "altText": "攻略速查不支援電腦版本",
        "template": {
            "type": "image_carousel",
            "columns": messageObject
        }
    };
    event.reply(message);
}

function getBombersImageUrl(datas) {
    let messageObject = new Array();
    datas.forEach(element => {
        messageObject.push({
            "imageUrl": element.lie,
            "action": {
                "type": "uri",
                "label": element.name,
                "uri": element.wiki
            }
        })
    })
    return messageObject;
}