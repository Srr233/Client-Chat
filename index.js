import myUtil from './src/util.js';

const createChatButton = document.querySelector('.createChat');
const chatNames = document.querySelector('.chatNames');
const users = document.querySelector('.users');
const sendButton = document.querySelector('.send');
const inputMessage = document.querySelector('.currMessage');
const blockMessages = document.querySelector('.block-messages');

const webSocketServer = new WebSocket('ws://localhost:8080');
webSocketServer.onopen = () => {
    console.log('open');
}
webSocketServer.onmessage = (responce) => {
    const json = JSON.parse(responce.data);
    const type = json.type;
    if (type === 'message') {
        myUtil.addMessage(json.name, json.message, blockMessages);
    }
}
sendButton.addEventListener('click', () => {
    const message = inputMessage.value;
    inputMessage.value = '';
    const text = JSON.stringify({
        type: 'message',
        name: 'sergey',
        message: message
    });
    webSocketServer.send(text);
})