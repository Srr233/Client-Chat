import myUtil from "./util.js";

class HandlerServerMessages {
    connect(json, userBlockElement) {
        json.users
        .forEach(user => { 
            myUtil.addPesonInCurrentChat(user, '', userBlockElement, json.myID);
        });
    }

    onMessageChat(json, element) {
        myUtil.addMessage(json.name, json.message, element);
    }

    onMessageUser(json, chatUserBlock, userMessages) {
        const currUserElem = document.querySelector(`[data-id=${json.fromID}]`);

        if (!chatUserBlock.classList.contains('chatClosed')) {
            userMessages.addMessageFor(json.fromID, json.message);
            myUtil.addMessage(currUserElem.textContent, json.message, document.querySelector('.userChat__messages'))
            return;
        }
        userMessages.addMessageFor(json.fromID, json.message);
        currUserElem.classList.add('blinking');
    }

    userLeft(json, myInfo, elementUsers, elementMessages) {
        while(elementUsers.children.length) {
            elementUsers.children[0].remove();
        }
        for (const user of json.users) {
            myUtil.addPesonInCurrentChat(user, '', elementUsers, myInfo.ID);
        }
        myUtil.userLeftMessage('', json.nameOfUser, elementMessages);
    }

    newUser(json, element) {
        myUtil.addPesonInCurrentChat(json, '', element);
    }
}

export default HandlerServerMessages;