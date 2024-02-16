import { RootState } from "../store"
import { createSelector } from "reselect"

const selectLikedTracks = (state: RootState) => state.liked.likedTrackList

export const selectVisibleLikedTracks = createSelector(
    [selectLikedTracks, (state: RootState, inputValue: string) => inputValue],
    (likedTrackList, inputValue) => {
      return likedTrackList.filter(
        track => track.title.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
  );
  