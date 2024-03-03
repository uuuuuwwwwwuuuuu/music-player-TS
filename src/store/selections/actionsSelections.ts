import { createAction } from "@reduxjs/toolkit";

export const selectSelection = createAction('@@seletions/SELECT_SELECTION', (selectionId: string) => ({
    payload: selectionId
}))