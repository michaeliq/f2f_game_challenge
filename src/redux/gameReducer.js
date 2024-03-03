"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameState: false,
    round: 0,
    points: 0,
    time: 0,
    turn: "",
    category: "",
    paused: true,
    questionNumber: 1,
    countTurn: 1,
    gameFinished: false,
    questionIdsByGame:[]
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
        updateTime: (state, action) => {
            const time = action.payload.time
            state.time = time
        },
        updateQuestionN: (state) => {
            state.questionNumber += 1
        },
        updateRound: (state) => {
            if (state.questionNumber > 9) {
                state.gameFinished = true
            }
            state.countTurn = 1
            state.round += 1
        },
        nextTurn: (state) => {
            if (state.countTurn < 2) {
                state.countTurn += 1
            }
        },
        selectTeam: (state, action) => {
            state.turn = action.payload
            state.paused = false
        },
        updateTurn: (state) => {
            if (state.turn === "A") {
                state.turn = "B"
            } else {
                state.turn = "A"
            }
        },
        updateCategoryByGame: (state,action)=>{
            const category = action.payload
        },
        updateQuestionsByGame:(state,action)=>{
            state.questionIdsByGame = action.payload
        },
        resetValues: (state) => {
            state.gameState = false,
                state.round = 0,
                state.points = 0,
                state.time = 0,
                state.turn = "",
                state.category = "",
                state.paused = false,
                state.questionNumber = 1,
                state.countTurn = 1,
                state.gameFinished = false,
                state.questionIdsByGame = []
        }
    }
})

export const { changeStateGame, updateCategoryByGame, selectTeam, changePausedStateGame, updateTime, updateQuestionN, updateTurn, updateRound, resetValues, nextTurn, updateQuestionsByGame } = gameSlice.actions
export default gameSlice.reducer