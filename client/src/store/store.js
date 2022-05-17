import { configureStore } from "@reduxjs/toolkit";
import  fetchReducer  from "../features/fetchAPI/fetchSlice"
import iuReducer from "../features/iuReducer/iuReducer";


export const store = configureStore({
    reducer:{
        fetch: fetchReducer,
        ui: iuReducer
    }
    
})

