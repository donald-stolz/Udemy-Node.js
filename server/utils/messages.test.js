var { generateMessage, generateLocationMessage } = require('./messages');

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

describe('generateLocationMessage', () => {
    it('Should generate the correct location object', () => {
        const from = 'admin';
        const lat = 37.5486682;
        const lon = -122.0592051;
        const url = `https://www.google.com/maps?q=${lat},${lon}`;
        var message = generateLocationMessage(from, lat, lon);

        expect(message).toHaveProperty('from', from);
        expect(message).toHaveProperty('url', url);
        expect(message).toHaveProperty('createdAt');
        expect(typeof message.createdAt).toBe('number');
    });
});
