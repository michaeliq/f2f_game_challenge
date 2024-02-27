"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameReducer"
import questionReducer from "./questionReducer";

const rootReducer = combineReducers({
    game:gameReducer,
    question:questionReducer
})

export const store = configureStore({
        reducer:rootReducer
    })
