import { createReducer } from "@reduxjs/toolkit";
import { selectSelection } from "./actionsSelections";

const selectionReducer = createReducer('liked', (builder) => {
    builder
        .addCase(selectSelection, (state, {payload}) => {
            return state = payload
        })
})

export default selectionReducer;