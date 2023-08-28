
'use client'
import {createSlice} from '@reduxjs/toolkit';

interface IBurger {
    isActive:boolean
}
const initialState:IBurger={
    isActive:false
}

export const BurgerSlice = createSlice({
    name: 'burger',
    initialState,
    reducers: {
        toggleBurger(state) {
            state.isActive =  !state.isActive
        },
        closeBurger(state){
            if(state.isActive){
                state.isActive = false
            }
            else {
                state.isActive
            }

        }
    }
})
export const {toggleBurger,closeBurger} = BurgerSlice.actions
