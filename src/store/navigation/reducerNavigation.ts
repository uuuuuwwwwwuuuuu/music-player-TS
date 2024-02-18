import { createReducer } from "@reduxjs/toolkit";
import { NavSelections, selectNavBlock } from "./actionsNavigation";

const navReducer = createReducer(NavSelections.HOME, (builder) => {
    builder
        .addCase(selectNavBlock, (state, {payload}) => {
            return state = payload
        })
})

export default navReducer;