const isFromSignupReducer = (state = false, action) => {
	switch (action.type) {
		case 'SIGNUP':
			return action.isFromSignup;
		default:
			return state;
	}
};

const isFromLoginReducer = (state = false, action) => {
	switch (action.type) {
		case 'LOGIN':
			return action.isFromLogin;
		default:
			return state;
	}
};

export default {
	isFromSignup: isFromSignupReducer,
	isFromLogin: isFromLoginReducer
};