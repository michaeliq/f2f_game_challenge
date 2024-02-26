"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameReducer"

const rootReducer = combineReducers({
    game:gameReducer
})

export const store = configureStore({
        reducer:rootReducer
    })
