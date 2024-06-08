import { createAction } from "@reduxjs/toolkit";

export const toggleShowUserData = createAction('@@user/TOGGLE_SHOW_USER_DATA', (bool: boolean) => ({
    payload: bool
}));

export const logoutUser = createAction('@@user/LOGOUT');

export const setUserPhoto = createAction('@@user/SET_USER_PHOTO', (imgUrl: string) => ({
    payload: imgUrl
}));