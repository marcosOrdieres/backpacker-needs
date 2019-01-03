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

const isBackpackScreenReducer = (state = false, action) => {
  switch (action.type) {
    case 'BACKPACK_SCREEN':
      return action.isBackpackScreen;
    default:
      return state;
  }
};

const isRegionChangedReducer = (state = true, action) => {
  switch (action.type) {
    case 'REGION_CHANGED':
      return action.isRegionChanged;
    default:
      return state;
  }
};

export default {
  isFromSignup: isFromSignupReducer,
  isFromLogin: isFromLoginReducer,
  isBackpackScreen: isBackpackScreenReducer,
  isRegionChanged:isRegionChangedReducer
};
