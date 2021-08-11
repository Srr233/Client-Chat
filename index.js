import myUtil from './src/util.js';
import UserMessages from './src/UserMessages.js';
import HandlerServerMessages from './src/HandlerServerMessages.js';
import SendData from './src/SendData.js';

const createChatButton = document.querySelector('.createChat');
const chatNames = document.querySelector('.chatNames');
const usersBlock = document.querySelector('.users');
const sendButton = document.querySelector('.send');
const inputMessage = document.querySelector('.currMessage');
const blockMessages = document.querySelector('.block-messages');
const chatUserBlock = document.querySelector('.userChat');

const myInfo = {};
const webSocketServer = new WebSocket('wss://nodejschatsaltanovich.herokuapp.com/');

const handlerServer = new HandlerServerMessages();
const sendData = new SendData(webSocketServer);
const userMessages = new UserMessages();

webSocketServer.onopen = () => {
    console.log('open');
}
webSocketServer.onmessage = (responce) => {
    const json = JSON.parse(responce.data);
    const type = json.type;

    if (type === 'connect') {
        myInfo.name = json.myName;
        myInfo.ID = json.myID;
        myInfo.currentChatID = json.chatID;
        
        handlerServer.connect(json, usersBlock);
        return;
    }

    if (type === 'message') handlerServer.onMessageChat(json, blockMessages);
    if (type === 'newUser') handlerServer.newUser(json, usersBlock);
    if (type === 'userLeft') handlerServer.userLeft(json, myInfo, usersBlock, blockMessages);
    if (type === 'messageUser') handlerServer.onMessageUser(json, chatUserBlock, userMessages);
}

sendButton.addEventListener('click', () => {
    sendData.sendMessageToChat(myInfo, inputMessage.value);
    myUtil.addMessage(myInfo.name, inputMessage.value, blockMessages);
    inputMessage.value = '';
});
const messagesBlockUser = document.querySelector('.userChat__messages');

usersBlock.addEventListener('click', ({ target }) => {
    const classOfStyle = target.classList[0];

    if (classOfStyle === 'user') {
        if (target.dataset.id === myInfo.ID) return;
        const userID = target.dataset.id;
        const messages = userMessages.messages[userID];
        if (messages) {
            messages.forEach(message => {
                myUtil.addMessage(target.textContent, message, messagesBlockUser);
            });
        }
        target.classList.remove('blinking')
        chatUserBlock.dataset.currentUser = userID;
        chatUserBlock.classList.remove('chatClosed');
    }
});

chatUserBlock.addEventListener('click', ({ target }) => {
    const classOfStyle = target.classList[0];

    if (classOfStyle === 'close') {
        userMessages.deleteMessagesFrom(chatUserBlock.dataset.currentUser);
        chatUserBlock.classList.add('chatClosed');
        while (messagesBlockUser.childElementCount) messagesBlockUser.children[0].remove(); 
        return;
    }

    const inputTarget = chatUserBlock.querySelector('.currMessageForUser');
    const blockUserMessages = chatUserBlock.querySelector('.userChat__messages');

    if (classOfStyle === 'send') {
        sendData.sendMessageToUser(chatUserBlock.dataset.currentUser, myInfo, inputTarget.value);
        myUtil.addMessage(myInfo.name, inputTarget.value, blockUserMessages);
        inputTarget.value = '';
        return;
    }
})