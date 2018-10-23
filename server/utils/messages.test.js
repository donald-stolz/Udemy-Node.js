var { generateMessage } = require('./messages');

describe('generateMessage', () => {
    it('Should generate the correct message object', () => {
        const from = 'admin';
        const text = 'hello';
        var message = generateMessage(from, text);

        expect(message).toHaveProperty('from', from);
        expect(message).toHaveProperty('text', text);
        expect(message).toHaveProperty('createdAt');
        expect(typeof message.createdAt).toBe('number');
    });
});
