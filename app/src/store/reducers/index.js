import { combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors"
import messages from "./messages"

const rootReducer = combineReducers({
    currentUser,
    messages,
    errors
})

export default rootReducer;