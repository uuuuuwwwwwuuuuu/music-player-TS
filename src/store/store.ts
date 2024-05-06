import { configureStore } from "@reduxjs/toolkit";

import likedReducer from "./likedPlayList/reducerLiked";
import currentPlayListReducer from "./current/reducerCurrent";
import userReducer from "./user/reducerUser";
import trackListReducer from "./tracks/reducerTrackList";
import artistsReducer from "./artists/reducerArtists";

const store = configureStore({
    reducer: {
        liked: likedReducer,
        current: currentPlayListReducer,
        user: userReducer,
        trackList: trackListReducer,
        artists: artistsReducer
    },
    devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch;