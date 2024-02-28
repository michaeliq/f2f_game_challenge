"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameReducer"
import questionReducer from "./questionReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    game:gameReducer,
    question:questionReducer,
    user:userReducer,
})

export const store = configureStore({
        reducer:rootReducer
    })
