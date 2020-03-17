const initialState = ['USD', 'USD'];

const setCurrency = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CURRENCY':
			return [
				action.currency[0],
				action.currency[1] ? action.currency[1] : state[1]
			];
		default:
			return state;
	}
}

export default setCurrency;
