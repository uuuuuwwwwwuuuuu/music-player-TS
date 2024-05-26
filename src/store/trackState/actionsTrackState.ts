import { createAction } from "@reduxjs/toolkit";

export const setAudioData = createAction('@@trackState/SET_AUDIO_DATA', (audioData: string) => ({
    payload: audioData
}));

export const setPause = createAction('@@trackState/SET_PAUSE');
export const setPlay = createAction('@@trackState/SET_PLAY');

export const rewindForward = createAction('@@trackState/REWIND_FORWARD');
export const rewindBack = createAction('@@trackState/REWIND_BACK');

export const toggleRepeat = createAction('@@trackState/TOGGLE_REPEAT', (bool) => ({
    payload: bool
}));

export const toggleRandom = createAction('@@trackState/TOGGLE_RANDOM', (bool) => ({
    payload: bool
}));

export const resetSomeStateData = createAction('@@trackState/RESET_SOME_STATE_DATA');

export const setCurrentTime = createAction('@@trackState/SET_CURRENT_TIME', (currentTime) => ({
    payload: currentTime
}))

export const setDuration = createAction('@@trackState/SET_DURATION', (duration) => ({
    payload: duration
}))

export const switchTrackAction = createAction('@@trackState/SWITCH_TRACK', (switchTrack: 'back' | 'idle' | 'forward') => ({
    payload: switchTrack
}))

export const setRewindCurrentTime = createAction('@@trackState/SET_REWIND_CURRENT_TIME', (currentTime) => ({
    payload: currentTime
}))