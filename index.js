import myUtil from './src/util.js';

const createChatButton = document.querySelector('.createChat');
const chatNames = document.querySelector('.chatNames');
const usersBlock = document.querySelector('.users');
const sendButton = document.querySelector('.send');
const inputMessage = document.querySelector('.currMessage');
const blockMessages = document.querySelector('.block-messages');

const myInfo = {};
const webSocketServer = new WebSocket('ws://localhost:8080');
webSocketServer.onopen = () => {
    console.log('open');
}
webSocketServer.onmessage = (responce) => {
    const json = JSON.parse(responce.data);
    const type = json.type;
    if (type === 'message') {
        myUtil.addMessage(json.name, json.message, blockMessages);
    } else if (type === 'connect') {
        myInfo.name = json.myName;
        myInfo.ID = json.myID;
        myInfo.currentChatID = json.chatID; 

        json.users.forEach(user => myUtil.addPesonInCurrentChat(user, '', usersBlock));
        
    } else if (type === 'newUser') {
        myUtil.addPesonInCurrentChat(json, '', usersBlock);
    } else if (type === 'userLeft') {
        while(usersBlock.children.length) {
            usersBlock.children[0].remove();
        }
        for (const user of json.users) {
            myUtil.addPesonInCurrentChat(user, '', usersBlock);
        }
        myUtil.userLeftMessage('', json.nameOfUser, blockMessages);
    }
}
sendButton.addEventListener('click', () => {
    const message = inputMessage.value;
    inputMessage.value = '';
    const text = JSON.stringify({
        type: 'message',
        name: myInfo.name,
        message: message,
        chatID: myInfo.currentChatID,
        ID: myInfo.ID
    });
    myUtil.addMessage(myInfo.name, message, blockMessages)
    webSocketServer.send(text);
})