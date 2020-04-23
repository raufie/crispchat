const initState = {
}
const authReducer = (state = initState, action) => {

    switch (action.type) {
        case "SIGN_UP_SUCCESS":
            return {
                ...state,
                profileData: action.profile
            };
            break;
        case "SIGN_UP_FAILURE":
            return {
                ...state,
                signUpError: action.error
            };
            break;
        case "SIGN_IN_SUCCESS":
            return {
                ...state,
                jwt: action.jwtKey,


            }
            break;
        case "SIGN_IN_FAILURE":
            return {
                ...state,
                error: action.error
            }
            break;
        case "SIGNED_IN":
            return {
                ...state,
                signedIn: true,
                profileData: action.profileData
            };
            break;
        case "SIGNED_OUT":
            return {
                ...state,
                signedIn: false
            };
            break;
        case "SIGN_OUT":
            return {
                ...state,
                signedIn: false
            }
            break;
        case "GET_USER_SUCCESSFULL":
            return {
                ...state,
                userAlreadyExists: true,
                requestedUser: action.requestedUser
            }
            break;
        case "GET_USER_UNSUCCESSFULL":
            return {
                ...state,
                userAlreadyExists: false
            }
            break;
        default:
            return state;
    }
}
export default authReducer;