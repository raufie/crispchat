const initState = {
    invalidPassword: false,
    passwordChanged: false,
    securityChanged: undefined
}

const settingsReducer = (state = initState, action) => {
    console.log(action.type)
    switch (action.type) {
        case "PASSWORD_CHANGED":
            return {
                ...state,
                passwordChanged: true
            }
            break;
        case "INVALID_PASSWORD":
            return {
                ...state,
                invalidPassword: true
            };
            break;
        case "SECURITY_CHANGED":
            return {
                ...state,
                securityChanged: true
            }
            break;
        default:
            return state
    }
}
export default settingsReducer;