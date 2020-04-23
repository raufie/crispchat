import { combineReducers } from 'redux';
import authReducer from './authReducer/authReducer'
import settingsReducer from './settingsReducer/settingsReducer';
import dashboardReducer from './dashboardReducer/dashboardReducer';
import chatReducer from './chatReducer/chatReducer';
const rootReducer = combineReducers({
    authReducer,
    settingsReducer,
    dashboardReducer,
    chatReducer
});
export default rootReducer;