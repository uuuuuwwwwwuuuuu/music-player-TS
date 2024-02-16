import { RootState } from "../store"

export const selectVisibleLikedTracks = (state: RootState , inputValue: string) => {
    return state.liked.likedTrackList.filter(
        track => track.title.toLowerCase().includes(inputValue.toLowerCase()
        ))
}