"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameState: false,
    round:0,
    points:0,
    time:0,
    turn:undefined,
    category:"",
    paused:false
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        changeStateGame: (state, action) => {
            const { stateGame } = action.payload
            state.gameState = stateGame
        },
        changePausedStateGame: (state, action) => {
            const pausedState = action.payload.paused
            state.paused = pausedState
        },
        updateTime:(state,action)=>{
            const time = action.payload.time
            state.time = time
        },
    }
})

export const { changeStateGame, changePausedStateGame, updateTime } = gameSlice.actions
export default gameSlice.reducer