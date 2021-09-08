function addMessage(name, message, element) {
    element.insertAdjacentHTML('beforeend', 
    `<div class="message">
        <span id="name">${name}</span>: <span id="message">${message}</span>
    </div>`);
}

function addMessageText(message, element) {
    element.insertAdjacentHTML('beforeend', `<div>${message}</div>`);
}

function userLeftMessage(currChatID, leftFromChatID, name, messageBlockElement) {
    if (currChatID === leftFromChatID) {
        messageBlockElement.insertAdjacentHTML('beforeend', 
        `<div class="message">
            <span id="name">${name}</span> <span id="message">Left from the chat :(</span>
        </div>`);
    }
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

function deletePersonFromUserBlock(userID) {
    document.querySelector(`[data-id="${userID}"]`).remove();
}
function createSendMessageTo(fromID, toID, message) {
    return {
        fromID,
        toID,
        message,
        type: 'messageUser'
    }
}

function chooseCurrentChat(newID) {
    const IDChoosenNow = document.querySelector('#usedCurrentChat');
    IDChoosenNow.id = '';
    const currentChatDiv = document.querySelector(`[data-id="${newID}"]`);
    currentChatDiv.id = 'usedCurrentChat';
}

function getIDFromDocument(target) {
    return target.data.ID;
}

function createChat(element, name, id) {
    if (name === 'Main') {
        element.insertAdjacentHTML('beforeend', 
        `<span class="chatName" id="usedCurrentChat" data-id="${id}">${name}</span>`);
        return;
    }
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

function setName(idOfUser, name) {
    const user = document.querySelector(`[data-id="${idOfUser}"]`);

    if (user) user.textContent = name;
}
const myUtil = {
    setName,
    createChat,
    addMessage,
    clearInputs,
    addMessageText,
    userLeftMessage,
    clearAllChildren,
    chooseCurrentChat,
    getIDFromDocument,
    createSendMessageTo,
    addPesonInCurrentChat,
    deletePersonFromUserBlock,
}

export default myUtil;