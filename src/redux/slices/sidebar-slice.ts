
'use client'
import {createSlice} from '@reduxjs/toolkit';

interface ISidebar {
    isActive:boolean
}
const initialState:ISidebar={
    isActive:true
}

export const SidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isActive =  !state.isActive
        },
    }
})
export const {toggleSidebar} = SidebarSlice.actions
