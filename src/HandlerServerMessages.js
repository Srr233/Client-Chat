import myUtil from "./util.js";

class HandlerServerMessages {
    connect(json, userBlockElement, chatNamesBlock) {
        json.users
        .forEach(user => { 
            myUtil.addPesonInCurrentChat(user, '', userBlockElement, json.myID);
        });
        json.chatNames.forEach(chat => {
            myUtil.createChat(chatNamesBlock, chat.name, chat.chatID);
        });
    }

    onMessageChat(json, element) {
        myUtil.addMessage(json.name, json.message, element);
    }

    onMessageUser(json, chatUserBlock, userMessages) {
        const currUserElem = document.querySelector(`[data-id="${json.fromID}"]`);

        if (!chatUserBlock.classList.contains('closed')) {
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
        myUtil.userLeftMessage(myInfo.currentChatID, json.chatID, json.nameOfUser, elementMessages);
    }

    newUser(json, element) {
        myUtil.addPesonInCurrentChat(json, '', element);
    }

    createdNewChat(json, chatNamesBlock) {
        myUtil.createChat(chatNamesBlock, json.chatName, json.ID);
    }

    dataFromAnotherChat(json, myID, blockMessages, usersBlock) {
        if (json.status) {
            return false;
        }
        const children = Array.from(usersBlock.children);
        children.forEach(elem => {
            if (elem.dataset.id !== myID)elem.remove();
        });
        json.users.forEach(user => {
            myUtil.addPesonInCurrentChat(user, '', usersBlock);
        });
        json.allMessages.forEach(message => {
            myUtil.addMessageText(message, blockMessages);
        });
        return true;
    }
}

export default HandlerServerMessages;