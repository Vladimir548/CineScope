import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {BurgerSlice} from "./slices/menu-slice";
import {SearchSlice} from "./slices/search-slice";
import {SidebarSlice} from "@/redux/slices/sidebar-slice";


const rootReducer = combineReducers({
    burger:BurgerSlice.reducer,
    search:SearchSlice.reducer,
    sidebar:SidebarSlice.reducer,
})
const store = configureStore({
    reducer:rootReducer
})

export default store
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch