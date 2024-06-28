import { createReducer } from "@reduxjs/toolkit";
import { resetSomeStateData, rewindBack, rewindForward, setAudioData, setPause, setPlay, setCurrentTime, switchTrackAction, toggleRandom, toggleRepeat, setDuration, setRewindCurrentTime, setPending } from "./actionsTrackState";

interface ITrackState {
    isRandom: boolean,
    isRepeat: boolean,
    isPlay: boolean,
    audioData: null | string,
    rewind: 'back' | 'idle' | 'forward',
    rewindCurrentTime: number
    trackTimeData: {
        currentTime: number,
        duration: number
    },
    switchTrack: 'back' | 'idle' | 'forward',
    pending: boolean
}

const initialState: ITrackState = {
    isRandom: false,
    isRepeat: false,
    isPlay: false,
    audioData: null,
    rewind: 'idle',
    trackTimeData: {
        currentTime: 0,
        duration: 0
    },
    switchTrack: 'idle',
    rewindCurrentTime: -1,
    pending: false
}

const trackStateReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setAudioData, (state, {payload}) => {
            state.audioData = payload
        })
        .addCase(setPause, (state) => {
            state.isPlay = false;
        })
        .addCase(setPlay, (state) => {
            state.isPlay = true;
        })
        .addCase(rewindBack, (state) => {
            state.rewind = 'back'
        })
        .addCase(rewindForward, (state) => {
            state.rewind = 'forward'
        })
        .addCase(toggleRandom, (state, {payload}) => {
            state.isRandom = payload;
        })
        .addCase(toggleRepeat, (state, {payload}) => {
            state.isRepeat = payload
        })
        .addCase(resetSomeStateData, (state) => {
            state.rewindCurrentTime = -1
            state.rewind = 'idle';
            state.switchTrack = 'idle';
        })
        .addCase(setCurrentTime, (state, {payload}) => {
            state.trackTimeData.currentTime = payload;
        })
        .addCase(setDuration, (state, {payload}) => {
            state.trackTimeData.duration = payload
        })
        .addCase(switchTrackAction, (state, {payload}) => {
            state.switchTrack = payload;
        })
        .addCase(setRewindCurrentTime, (state, {payload}) => {
            state.rewindCurrentTime = payload;
        })
        .addCase(setPending, (state, {payload}) => {
            state.pending = payload;
        })
})

export default trackStateReducer;