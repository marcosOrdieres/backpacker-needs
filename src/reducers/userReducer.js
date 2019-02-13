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

const isRecosUpdatedReducer = (state = false, action) => {
  switch (action.type) {
    case 'RECOS_UPDATED':
      return action.isRecosUpdated;
    default:
      return state;
  }
};

const isSameRegionReducer = (state = false, action) => {
  switch (action.type) {
    case 'SAME_REGION':
      return action.isSameRegion;
    default:
      return state;
  }
};

const isDestinationToWhatScreenReducer = (state = false, action) => {
  switch (action.type) {
    case 'FROM_DESTINATION_TO_WHAT':
      return action.isDestinationToWhatScreen;
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
