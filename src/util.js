function addMessage(name, message, element) {
    element.insertAdjacentHTML('beforeend', 
    `<div class="message">
        <span id="name">${name}</span>: <span id="message">${message}</span>
    </div>`);
}

const myUtil = {
    addMessage
}

export default myUtil;