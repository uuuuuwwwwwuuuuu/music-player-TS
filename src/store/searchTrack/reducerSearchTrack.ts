import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { searchLikedTrack, toggleIsFocus } from "./actionsSearchTrack";

const initialState = {
    search: '',
    isFocus: false
}

const searchReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(searchLikedTrack, (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        })
        .addCase(toggleIsFocus, (state, {payload}) => {
            state.isFocus = payload;
        })
})

export default searchReducer;