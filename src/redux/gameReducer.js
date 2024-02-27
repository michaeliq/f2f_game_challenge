"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameState: false,
    round:0,
    points:0,
    time:0,
    turn:1,
    category:"",
    paused:false,
    questionNumber:1
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
        updateQuestionN:(state)=>{
            state.questionNumber += 1
        },
        updateTurn:(state)=>{
            state.turn += 1
        },
        resetValues:(state)=>{
            state.gameState= false,
            state.round=0,
            state.points=0,
            state.time=0,
            state.turn=1,
            state.category="",
            state.paused=false,
            state.questionNumber=1
        }
    }
})

export const { changeStateGame, changePausedStateGame, updateTime, updateQuestionN, updateTurn, resetValues } = gameSlice.actions
export default gameSlice.reducer