import { createAction } from "@reduxjs/toolkit";
import { INotificationData } from "./reducerNotification";

export const addNotification = createAction('@@notification/ADD_NOTIFICATION', (notificationData: INotificationData) => ({
    payload: notificationData
}));

export const deleteNotification = createAction('@@notification/DELETE_NOTIFICATION', (notificationId: string) => ({
    payload: notificationId
}))

