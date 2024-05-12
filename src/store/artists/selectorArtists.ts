import { RootState } from "../store"

export const getCurrentArtist = (state: RootState, name: string) => {
    return state.artists.artists.find(artist => artist.name === name)
}