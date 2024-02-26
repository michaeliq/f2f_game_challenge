"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameState: false
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        changeStateGame: (state, action) => {
            const { stateGame } = action.payload
            state.gameState = stateGame
        }
    }
})

export const { changeStateGame } = gameSlice.actions
export default gameSlice.reducer