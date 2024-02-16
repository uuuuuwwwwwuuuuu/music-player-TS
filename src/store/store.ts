import { configureStore } from "@reduxjs/toolkit";

import likedReducer from "./likedPlayList/reducerLiked";
import searchReducer from "./searchTrack/reducerSearchTrack";

const store = configureStore({
    reducer: {
        liked: likedReducer,
        search: searchReducer
    },
    devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;