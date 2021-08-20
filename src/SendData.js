import myUtil from "./util.js";

class SendData {
    constructor(socket) {
        this._webSocketServer = socket;
    }

    sendMessageToChat(myInfo, message) {
        const text = JSON.stringify({
            type: 'message',
            name: myInfo.name,
            message,
            chatID: myInfo.currentChatID,
            ID: myInfo.ID
        });
        this._webSocketServer.send(text);
    }

    sendMessageToUser(choosenUserID, myInfo, message) {
        const messageFor = myUtil.createSendMessageTo(myInfo.ID, choosenUserID, message);
        const jsonString = JSON.stringify(messageFor);
        this._webSocketServer.send(jsonString);
    }

    sendCreateChat(nameOfChat, password, currentChatID) {
        const data = { 
            chatName: nameOfChat, 
            password,
            currentChatID,
            type: 'create'
        };
        this._webSocketServer.send(JSON.stringify(data));
    }

    joinChat(userName, chatID, password = '', currentChatID) {
        const data = {
            name: userName,
            chatID,
            password,
            currentChatID,
            type: 'join'
        }

        this._webSocketServer.send(JSON.stringify(data));
    }
}

export default SendData;