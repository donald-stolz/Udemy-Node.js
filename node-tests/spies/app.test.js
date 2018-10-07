const rewire = require('rewire');

const app = rewire('./app');

describe('App', () => {
	const db = {
		saveUser: jest.fn((obj) => { console.log(`Hello ${obj.email}`);})
	};

	app.__set__('db', db);

	it('Should call the spy correctly', () => {
		const spy = jest.spyOn(app, 'handleSignup');
		// const signUp = app.handleSignup('d@email.com', '$ecreT')
		spy('d@email.com', '$ecreT');
		expect(spy).toHaveBeenCalled();
		spy.mockRestore();
	});
	
});