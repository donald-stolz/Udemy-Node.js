const { Users } = require('./users');

describe('Users', function() {
    it('Should add a new user ', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Don',
            room: '42'
        };
        var result = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
        expect(result).toEqual(user);
    });
});
