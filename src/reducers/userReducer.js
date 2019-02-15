const isFromSignupReducer = (state = false, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return action.isFromSignup;
    case 'RESET_USER':
      return false;
    default:
      return state;
  }
};

const isFromLoginReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.isFromLogin;
    case 'RESET_USER':
      return false;
    default:
      return state;
  }
};

const isBackpackScreenReducer = (state = false, action) => {
  switch (action.type) {
    case 'BACKPACK_SCREEN':
      return action.isBackpackScreen;
    case 'RESET_USER':
      return false;
    default:
      return state;
  }
};

const isRegionChangedReducer = (state = true, action) => {
  switch (action.type) {
    case 'REGION_CHANGED':
      return action.isRegionChanged;
    case 'RESET_USER':
      return true;
    default:
      return state;
  }
};

const isRecosUpdatedReducer = (state = false, action) => {
  switch (action.type) {
    case 'RECOS_UPDATED':
      return action.isRecosUpdated;
    case 'RESET_USER':
      return false;
    default:
      return state;
  }
};

const isSameRegionReducer = (state = false, action) => {
  switch (action.type) {
    case 'SAME_REGION':
      return action.isSameRegion;
    case 'RESET_USER':
      return false;
    default:
      return state;
  }
};

const isDestinationToWhatScreenReducer = (state = false, action) => {
  switch (action.type) {
    case 'FROM_DESTINATION_TO_WHAT':
      return action.isDestinationToWhatScreen;
    case 'RESET_USER':
      return false;
    default:
      return state;
  }
};

export default {
  isFromSignup: isFromSignupReducer,
  isFromLogin: isFromLoginReducer,
  isBackpackScreen: isBackpackScreenReducer,
  isRegionChanged: isRegionChangedReducer,
  isRecosUpdated: isRecosUpdatedReducer,
  isSameRegion: isSameRegionReducer,
  isDestinationToWhatScreen: isDestinationToWhatScreenReducer
};
