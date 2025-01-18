import { combineReducers } from "redux";
import {dataSlice} from "../slices/tabsSlice.js";

const rootReducer = combineReducers({
    dataSlice : dataSlice.reducer,
});



export default rootReducer;