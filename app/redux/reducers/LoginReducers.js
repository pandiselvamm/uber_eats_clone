let defaultState = {
    data: { isLoggedIn: false, user: [] }
}

let userReducers = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_START': {
            let newState = { ...state };
            newState.data = {
                user: action.payload,
                isLoggedIn: true
            }
            return newState;
        }
        case 'LOGOUT': {
            let newState = { ...state };
            newState.data = {
                user: [],
                isLoggedIn: false
            }
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default userReducers