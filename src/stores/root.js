import {
	combineReducers,
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import thunk from 'redux-thunk';
import reduxReset from 'redux-reset';

import splashReducer from '../reducers/splashReducer';
import userReducer from '../reducers/userReducer';

const appReducer = combineReducers({
  isFromSignup: userReducer.isFromSignup,
  isFromLogin: userReducer.isFromLogin,
  isBackpackScreen: userReducer.isBackpackScreen
});

const rootStore = createStore(appReducer, applyMiddleware(thunk), reduxReset());

export default rootStore;
