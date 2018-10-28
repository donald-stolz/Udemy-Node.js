const { Users } = require('./users');

describe('Users', function() {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 123,
                name: 'Don',
                room: '42'
            },
            {
                id: 143,
                name: 'Dan',
                room: '42'
            },
            {
                id: 134,
                name: 'Din',
                room: '42'
            },
            {
                id: 124,
                name: 'Steve',
                room: 'React'
            }
        ];
    });

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

    it('Should return names for 42', () => {
        var userList = users.getUserList('42');

        expect(userList).toHaveLength(3);
        expect(userList).toEqual(['Don', 'Dan', 'Din']);
    });

    it('Should return names for React', () => {
        var userList = users.getUserList('React');

        expect(userList).toHaveLength(1);
        expect(userList).toContainEqual(users.users[3].name);
    });

    it('Should get user info', () => {
        var user = users.getUser(123);

        expect(user).toEqual(users.users[0]);
    });

    it('Should not get false user info', () => {
        var user = users.getUser(1234);

        expect(user).toBeFalsy();
    });

    it('Should remove a user', () => {
        var user = users.removeUser(123);
        var userList = users.getUserList('42');

        expect(user).toHaveLength(1);
        expect(user[0]).toEqual({
            id: 123,
            name: 'Don',
            room: '42'
        });
        expect(userList).toHaveLength(2);
        expect(userList).toEqual(['Dan', 'Din']);
        expect(users.users[0].name).toBe('Dan');
    });

    it('Should not remove a false user', () => {
        var user = users.removeUser(34);
        var userList = users.getUserList('42');

        expect(user).toBeFalsy();
        expect(userList).toHaveLength(3);
        expect(userList).toEqual(['Don', 'Dan', 'Din']);
        expect(users.users[0].name).toBe('Don');
    });
});
