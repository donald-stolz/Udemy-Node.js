const utils = require('./utils');

test('Should add 33 to 11', () => {
    expect(utils.add(33, 11)).toBe(44);
  });

test('Should square 12', () => {
    expect(utils.square(12)).toBe(144);
});

test('Should async add 42 to 21', (done) => {
    utils.asyncAdd(42, 21, (sum) => {
        expect(sum).toBe(63);
        done();
    })
})

test('Should square 42', (done) => {
    utils.asyncSquare(42, (square) => {
        expect(square).toBe(1764);
        done();
    })
})

test('Should create a new user', () => {
    // expect({name:"Andrew"}).toEqual({name:"Andrew"});
    // expect([2,3,4]).toContain(3);
    expect(utils.createUser('Andrew', 25, 'Chicago'))
    .toMatchObject({
        name: expect.any(String),
        age: expect.any(Number),
        location: expect.any(String)
    });
})
