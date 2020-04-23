const initState = {

};
const chatReducer = (state = initState, action) => {
    // actions
    // LOADED_MESSAGES
    // ERROR_LOADING_MESSAGES
    // MESSAGE_SENT
    // MESSAGE_NOT_SENT
    console.log(action.type)
    switch (action.type) {
        case "LOADED_MESSAGES":
            return {
                ...state,
                loadedMessages: action.payload
            };
            break;
        case "ERROR_LOADING_MESSAGES":
            return {
                ...state,
                loadError: action.payload
            }
            break;
        case "MESSAGE_SENT":
            return {
                ...state,
                sentMessage: action.payload,
                sentImage: action.image
            }
            break;
        case "MESSAGE_NOT_SENT":
            return {
                ...state,
                sendError: action.payload
            }
            break;
        default:
            return state
    }
}
export default chatReducer;