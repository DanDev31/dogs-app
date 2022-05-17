import { createSlice } from '@reduxjs/toolkit'


const iuReducer = createSlice({
    name: 'iuReducer',
    initialState:{
        errorMessage: null
    },
    reducers:{
        setError(state, { payload }){
            state.errorMessage = payload
        },
        removeError(state){
            state.errorMessage = null 
        }
    }
})


export const uiActions = iuReducer.actions
export default iuReducer.reducer