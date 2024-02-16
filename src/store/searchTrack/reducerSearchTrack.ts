import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { searchLikedTrack } from "./actionsSearchTrack";

const initialState: string = ''

const searchReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(searchLikedTrack, (state, action: PayloadAction<string>) => {
            return state = action.payload
        })
})

export default searchReducer;