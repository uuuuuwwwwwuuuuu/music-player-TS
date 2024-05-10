import { createReducer } from "@reduxjs/toolkit";

import { addNotification, deleteNotification } from "./actionsNotification";
import { ReactNode } from "react";

export interface INotificationData {
    img: string | ReactNode,
    info: string,
    additionalInfo: string,
    notificationId: string
}

const initialState: INotificationData[] = [];

const notificationQueueReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addNotification, (state, {payload}) => {
            state.push(payload);
        })
        .addCase(deleteNotification, (state, {payload}) => {
            return state.filter(item => item.notificationId !== payload)
        })
});

export default notificationQueueReducer
