export const toggleShowHidden = () => {
  return {
    type: 'TOGGLE_SHOW_HIDDEN'  
  }
}

export const authorizeAdmin = token => {
  return {
    type: 'AUTHORIZE_ADMIN',
    token
  }
}

export const logoutAdmin = () => {
  localStorage.clear()
  return {
    type: 'RESET_ADMIN'
  }
}

export const addLoginError = () => {
  return {
    type: 'ADD_LOGIN_ERROR'
  }
}

// ** Async Actions **
export const login = auth => {
  return dispatch => {
    const { user, password } = auth
    return fetch('/api/user_token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        auth: { 
          username: user,
          password: password
        }
      })
    })
      .then(response => response.json())
      .then(({ jwt }) => {
        localStorage.setItem('jwt', jwt)
        dispatch(authorizeAdmin())
      })
      .catch(error => {
        console.log('contact form error: ', error)
        dispatch(addLoginError())
      })
  }
}