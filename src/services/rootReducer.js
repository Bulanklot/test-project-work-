import { combineReducers } from "redux";
import {dataSlice} from "../slices/tabsSlice.js";
import {converterSlice} from "../slices/converterSlice.js";

const rootReducer = combineReducers({
    dataSlice : dataSlice.reducer,
    converterSlice : converterSlice.reducer
});



export default rootReducer;