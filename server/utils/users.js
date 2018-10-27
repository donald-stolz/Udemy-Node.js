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
}

module.exports = { Users };

// class User {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
// 	}

//     getUserDescripton() {
//         return `${this.name} is ${this.age} years old.`;
//     }
// }
