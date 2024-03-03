import { configureStore } from "@reduxjs/toolkit";

import likedReducer from "./likedPlayList/reducerLiked";
import searchReducer from "./searchTrack/reducerSearchTrack";
import currentPlayListReducer from "./current/reducerCurrent";
import navReducer from "./navigation/reducerNavigation";
import selectionReducer from "./selections/reducerSelections";

const store = configureStore({
    reducer: {
        liked: likedReducer,
        search: searchReducer,
        current: currentPlayListReducer,
        nav: navReducer,
        selection: selectionReducer
    },
    devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;