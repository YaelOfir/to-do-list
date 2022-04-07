import { combineReducers} from "redux"
import toDoListReducer from "./reducer"

const rootReducer = combineReducers({
    projects: toDoListReducer
})

export default rootReducer