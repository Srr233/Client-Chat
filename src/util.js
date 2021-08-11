function addMessage(name, message, element) {
    element.insertAdjacentHTML('beforeend', 
    `<div class="message">
        <span id="name">${name}</span>: <span id="message">${message}</span>
    </div>`);
}
function userLeftMessage(currChatID, name, messageBlockElement) {
    messageBlockElement.insertAdjacentHTML('beforeend', 
    `<div class="message">
        <span id="name">${name}</span> <span id="message">Left from the chat :(</span>
    </div>`);
}
function addPesonInCurrentChat(user, chat, chatElement, myID) {
    if (myID === user.ID) {
        chatElement.insertAdjacentHTML('beforeend', 
        `<div class="user curr-user" data-id="${user.ID}">${user.name}</div>`);
        return;
    }
    chatElement.insertAdjacentHTML('beforeend', 
        `<div class="user hover" data-id="${user.ID}">${user.name}</div>`);
}

function createSendMessageTo(fromID, toID, message) {
    return {
        fromID,
        toID,
        message,
        type: 'messageUser'
    }
}

function getIDFromDocument(target) {
    return target.data.ID;
}
const myUtil = {
    addMessage,
    userLeftMessage,
    getIDFromDocument,
    createSendMessageTo,
    addPesonInCurrentChat,
}

export default myUtil;