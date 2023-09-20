import {createSlice} from "@reduxjs/toolkit";
import {AppThunk} from "../app/store.ts";
import genericService from "../services/genericService.ts";

type TFilter = {
    user: string;
    filterName: string;
}

const baseUrl = '/api/filters'

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

export const initializeFilters = (): AppThunk => {
    return async (dispatch) => {
        const filters = genericService.getAll(baseUrl)
        dispatch(set(filters))
    }
}

export const addFilter = (filter: TFilter): AppThunk => {
    return async (dispatch) => {
        const newFilter = await genericService.create(filter, baseUrl)
        dispatch(add(newFilter));
    }
}