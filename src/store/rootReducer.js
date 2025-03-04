import { combineReducers } from "redux";
import {dataSlice} from "./dates/tabsSlice.js";
import {converterSlice} from "./currencyRates/index.js";

const rootReducer = combineReducers({
    dataSlice : dataSlice.reducer,
    converterSlice : converterSlice.reducer
});



export default rootReducer;