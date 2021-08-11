class UserMessages {
    constructor() {
        this._messages = {}
    }

    addMessageFor(userID, message) {
        if (this._messages[userID]) {
            this._messages[userID].push(message);
            return;
        }
        this._messages[userID] = [message];
    }

    deleteMessagesFrom(userID) {
        this._messages[userID] = undefined;
    }

    get messages() {
        return this._messages;
    }
}

export default UserMessages;