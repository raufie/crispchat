import { statement } from "@babel/template";

const initState = {
    loadedContacts: null
}
const dashboardReducer = (state = initState, action) => {
    console.log(action.type)

    //actions
    /*
    USER_FOUND
    CONTACTS_LOADED
    
    */

    switch (action.type) {
        case "USER_FOUND"://
            return {
                ...state,
                searchedUser: action.payload//if null then none found
            }
            break;
        case "LOADED_CONTACTS":
            return {
                ...state,
                loadedContacts: action.payload
            }
            break;
        case "CONTACTS_NOT_LOADED":
            return {
                ...state,
                contactsError: "Couldn't load contacts"
            }
            break;
        case "CONTACT_EXISTS":
            return {
                ...state,
                contactExists: true
            };
            break;
        case "CONTACT_DOES_NOT_EXIST":
            return {
                ...state,
                contactExists: false
            }
            break;
        default:
            return state;
    }
}
export default dashboardReducer;
