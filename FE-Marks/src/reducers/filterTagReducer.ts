import {createSlice} from "@reduxjs/toolkit";
import {AppThunk} from "../app/store.ts";

const initialState = [] as string[]

const slice = createSlice({
    name: 'filterTag',
    initialState,
    reducers: {
        set(state, action) {
            state = action.payload;
            return state
        },
        add(state, action) {
          state.push(action.payload);
        }
    }
})

const {set, add} = slice.actions;

export const initializeFilters = (): AppThunk => [
    return async (dispatch) => {

    }
]