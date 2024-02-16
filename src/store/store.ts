import { configureStore } from "@reduxjs/toolkit";

import likedReducer from "./likedPlayList/reducerLiked";

const store = configureStore({
    reducer: {
        liked: likedReducer
    },
    devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;