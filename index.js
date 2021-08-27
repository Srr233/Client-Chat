import myUtil from './src/util.js';
import UserMessages from './src/UserMessages.js';
import HandlerServerMessages from './src/HandlerServerMessages.js';
import SendData from './src/SendData.js';

const createChatButton = document.querySelector('.createChat');
const chatNames = document.querySelector('.chatNames');
const newChatBlock = document.querySelector('.newChat-block');
const usersBlock = document.querySelector('.users');
const sendButton = document.querySelector('.send');
const inputMessage = document.querySelector('.currMessage');
const blockMessages = document.querySelector('.block-messages');
const chatUserBlock = document.querySelector('.userChat');

const joinChatBlock = document.querySelector('.joinChat');

const myInfo = {

};
const webSocketServer = new WebSocket('wss://nodejschatsaltanovich.herokuapp.com/');
// const webSocketServer = new WebSocket('ws://localhost:8080');

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

        json.messages.forEach(message => myUtil.addMessageText(message, blockMessages));
        handlerServer.connect(json, usersBlock, chatNames);
        return;
    }

    if (type === 'message') handlerServer.onMessageChat(json, blockMessages);
    if (type === 'newUser') handlerServer.newUser(json, usersBlock);
    if (type === 'userLeft') handlerServer.userLeft(json, myInfo, usersBlock, blockMessages);
    if (type === 'messageUser') handlerServer.onMessageUser(json, chatUserBlock, userMessages);
    if (type === 'create') { 
        handlerServer.createdNewChat(json, chatNames);
        if (myInfo.ID !== json.userID) {

            const nameOfLeft = document.querySelector(`[data-id=${json.userID}]`).textContent;
            myUtil.deletePersonFromUserBlock(json.userID);
            myUtil.userLeftMessage(myInfo.currentChatID, json.previousChatID, nameOfLeft, blockMessages);
            return;
        }

        myUtil.chooseCurrentChat(json.ID);
        myInfo.currentChatID = json.ID;
    }
    if (type === 'join') {
        myUtil.clearAllChildren(blockMessages);
        const result = handlerServer.dataFromAnotherChat(json, myInfo.ID, blockMessages, usersBlock);
        if (!result) {
            joinChatBlock.querySelector('.joinChat__password').classList.add('red');
            return;
        }
        myUtil.chooseCurrentChat(json.chatID);
        myInfo.currentChatID = json.chatID;
        joinChatBlock.querySelector('.joinChat__password').classList.remove('red');
        joinChatBlock.classList.add('closed');
    }
}

sendButton.addEventListener('click', () => {
    sendData.sendMessageToChat(myInfo, inputMessage.value);
    myUtil.addMessage(myInfo.name, inputMessage.value, blockMessages);
    myUtil.clearInputs([inputMessage]);
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
        chatUserBlock.classList.remove('closed');
    }
});

chatUserBlock.addEventListener('click', ({ target }) => {
    const classOfStyle = target.classList[0];

    if (classOfStyle === 'close') {
        userMessages.deleteMessagesFrom(chatUserBlock.dataset.currentUser);
        chatUserBlock.classList.add('closed');
        myUtil.clearAllChildren(messagesBlockUser);
        return;
    }

    const inputTarget = chatUserBlock.querySelector('.currMessageForUser');
    const blockUserMessages = chatUserBlock.querySelector('.userChat__messages');

    if (classOfStyle === 'send') {
        sendData.sendMessageToUser(chatUserBlock.dataset.currentUser, myInfo, inputTarget.value);
        myUtil.addMessage(myInfo.name, inputTarget.value, blockUserMessages);
        myUtil.clearInputs(inputTarget);
        return;
    }
});
const toggleClose = (element) => {
    element.classList.toggle('closed');
}
createChatButton.addEventListener('click', () => {
    toggleClose(newChatBlock);
});

newChatBlock.querySelector('.newChat-block__close').addEventListener('click', () => {
    toggleClose(newChatBlock);
});

newChatBlock.querySelector('.newChat-block__button').addEventListener('click', () => {
    const nameInput = document.querySelector('.newChat-block__name');
    const valueInput = document.querySelector('.newChat-block__password');
    const currentChat = document.querySelector('#usedCurrentChat').dataset.id;

    const name = nameInput.value;
    const pass = valueInput.value;

    sendData.sendCreateChat(name, pass, currentChat);
    
    myUtil.clearInputs([nameInput, valueInput]);
    myUtil.clearAllChildren([usersBlock, blockMessages]);

    myUtil.addPesonInCurrentChat(myInfo, '', usersBlock, myInfo.ID);

    toggleClose(newChatBlock);
});

chatNames.addEventListener('click', ({ target }) => {
    const classOfStyle = target.classList[0];

    if (classOfStyle === 'chatName') {
        const idCurrentChat = target.dataset.id;
        if (target.textContent !== 'Main') {
            joinChatBlock.querySelector('.joinChat__name').textContent = target.textContent;
            joinChatBlock.dataset.id = idCurrentChat;
            toggleClose(joinChatBlock);
            return;
        }
        const currentChat = document.querySelector('#usedCurrentChat').dataset.id;
        const input = joinChatBlock.querySelector('.joinChat__password');
        const pass = input.value;
        myUtil.clearInputs(input);

        sendData.joinChat(myInfo.name, target.dataset.id, pass, currentChat);
    }
});

joinChatBlock.addEventListener('click', ({ target }) => {
    const classOfStyle = target.classList[0];

    if (classOfStyle === 'joinChat__close') {
        toggleClose(joinChatBlock);
        return;
    }

    if (classOfStyle === 'joinChat__button') {
        const currentChat = document.querySelector('#usedCurrentChat').dataset.id;
        const input = joinChatBlock.querySelector('.joinChat__password');
        const pass = input.value;
        myUtil.clearInputs(input);

        sendData.joinChat(myInfo.name, joinChatBlock.dataset.id, pass, currentChat);
    }
});