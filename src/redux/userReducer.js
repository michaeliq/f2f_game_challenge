"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    groupA : {
        user1:"",
        user2:"",
        points:0,
        time:0,
        category:""
    },
    groupB : {
        user1:"",
        user2:"",
        points:0,
        time:0,
        category:""
    },
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setGroup:(state,action)=>{
            const {user1,user2,category,group} = action.payload
            if(group === "A"){
                state.groupA.user1 = user1
                state.groupA.user2 = user2
                state.groupA.category = category
            }else if(group === "B"){
                state.groupB.user1 = user1
                state.groupB.user2 = user2
                state.groupB.category = category
            }
        },
        incrementTotalTime:(state,action)=>{
            const {time,group} = action.payload
            if(group === "A"){
                state.groupA.time = time
            }else if(group === "B"){
                state.groupB.time = time
            }
        },
        incrementPoints:(state,action)=>{
            const {points,group} = action.payload
            if(group === "A"){
                state.groupA.points += points
            }else if(group === "B"){
                state.groupB.points += points
            }
        },
        resetUserValues:(state)=>{
            state.groupA = {
                user1:"",
                user2:"",
                points:0,
                time:0,
                category:""
            }
            state.groupB = {
                user1:"",
                user2:"",
                points:0,
                time:0,
                category:""
            }
        }
    }
})

export const { incrementPoints, incrementTotalTime, setGroup, resetUserValues } = userSlice.actions
export default userSlice.reducer