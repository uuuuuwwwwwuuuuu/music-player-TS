import { createAction } from "@reduxjs/toolkit";

export enum NavSelections {
    HOME = 'HOME',
    SEARCH = 'SEARCH',
    USER = 'USER',
    SETTINGS = 'SETTINGS'
}

export const selectNavBlock = createAction('@@navigation/SELECT_NAV_BLOCK', (NavSelections) => ({
    payload: NavSelections
}))