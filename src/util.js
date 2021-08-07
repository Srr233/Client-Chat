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
function addPesonInCurrentChat(user, chat, chatElement) {
    chatElement.insertAdjacentHTML('beforeend', 
    `<div class="user" data-id="${user.ID}">${user.name}</div>`);
}

const myUtil = {
    addMessage,
    userLeftMessage,
    addPesonInCurrentChat,
}

export default myUtil;