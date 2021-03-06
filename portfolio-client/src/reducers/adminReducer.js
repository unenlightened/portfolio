const initialState = {
  auth: localStorage.getItem('jwt') ? true : false,
  showHidden: false,
  loginError: false
}

export default (state = initialState, action) => {
  switch(action.type) {
  
    case 'RESET_ADMIN':
      return initialState
    
    case 'AUTHORIZE_ADMIN':
      return { ...state,
         auth: localStorage.getItem('jwt') ? true : false,
         loginError: false
        }
    
    case 'ADD_LOGIN_ERROR':
      return { ...state, loginError: true }
    
    case 'TOGGLE_SHOW_HIDDEN':
      return { ...state, showHidden: !state.showHidden }

    default:
      return state
  }
}