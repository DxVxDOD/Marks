import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commentService";
import { AppThunk } from "../app/store";
import { TComment } from "../types/comment";

const initialState = [] as TComment[]

const slice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        set(state, action) {
            state = action.payload
            return state
        },
        create(state, action) {
            state.push(action.payload)
        }
    }
})

const { set, create } = slice.actions

export const initializeComments = (): AppThunk => {
    return async dispatch => {
        const comments = await commentService.getAll();
        dispatch(set(comments))
    }
}

export const createComment = (comment: TComment): AppThunk => {
    return async dispatch => {
        const newComment = await commentService.create(comment)
        dispatch(create(newComment))
    }
}

export default slice.reducer