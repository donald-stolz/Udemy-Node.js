const { isRealString } = require('./validators');

describe('isRealString', () => {
    it('Should reject non-string values', () => {
        const ret = isRealString(1);

        expect(ret).toBeFalsy();
    });
    it('Should reject strings with only spaces', () => {
        const ret = isRealString('	');

        expect(ret).toBeFalsy();
    });
    it('Should allow strings with non-space characters', () => {
        const ret = isRealString('	42	');

        expect(ret).toBeTruthy();
    });
});
