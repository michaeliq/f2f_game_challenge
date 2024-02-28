"use client"

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    questionBody:[],
    options:[],
    answer:"",
}

export const questionSlice = createSlice({
    name:"question",
    initialState,
    reducers:{
        changeDataQuestion: (state,action) => {
            const {answer,options,questionBody} = action.payload
            state.answer = answer
            state.options = options
            state.questionBody = questionBody
        },
        resetQuestion: (state) =>{
            state.questionBody=[]
            state.options=[]
            state.answer=""
        }
    }
})

export const { changeDataQuestion, resetQuestion } = questionSlice.actions
export default questionSlice.reducer