import React from 'react';
import App from './app';

describe('App', () => {
	const component = render(<App />);
	it('App render correctly', () => {
		expect(component).toMatchSnapshot();
	});
});
