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

function createChat(element, name, id) {
    element.insertAdjacentHTML('beforeend', 
    `<span class="chatName" data-id="${id}">${name}</span>`);
}

function clearInputs(inputs) {
    if (Array.isArray(inputs)) {
        inputs.forEach(i => { i.value = '' });
    }
    inputs.value = '';
}

function clearAllChildren(element) {
    if (Array.isArray(element)) {
        element.forEach(el => {
            while(el.childElementCount) el.children[0].remove();
        });
        return;
    }

    while(element.childElementCount) element.children[0].remove();
}

const myUtil = {
    clearInputs,
    createChat,
    addMessage,
    userLeftMessage,
    clearAllChildren,
    getIDFromDocument,
    createSendMessageTo,
    addPesonInCurrentChat,
}

export default myUtil;