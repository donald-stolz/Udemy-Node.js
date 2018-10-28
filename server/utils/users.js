// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserlist(room)

class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        return index > -1 ? this.users.splice(index, 1) : null;
    }

    getUser(id) {
        return this.users.find(user => user.id === id);
    }

    getUserList(room) {
        var users = this.users.filter(user => user.room === room);
        return users.map(user => user.name);
    }
}

module.exports = { Users };
