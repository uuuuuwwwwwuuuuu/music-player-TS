import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { resetSomeStateData, setPlay, setCurrentTime, setDuration, setPause, setAudioData, switchTrackAction, setPending } from "../../store/trackState/actionsTrackState";
import { ITrack } from "../../store/likedPlayList/reducerLiked";
import { selectCurrentTrack, selectShuffledPlayList } from "../../store/current/actionsCurrent";

export const shuffle = (array: ITrack[]): ITrack[] => {
    const shuffledArray = [...array];

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
};

const AudioModule: FC = () => {
    const dispatch = useAppDispatch();

    const {audioData, isPlay, isRepeat, isRandom, rewindCurrentTime, rewind, switchTrack} = useAppSelector(state => state.trackState);
    const {currentPlayList, trackId, shuffledArr} = useAppSelector(state => state.current);

    const [audio] = useState(new Audio());

    const [currentTrack, setCurrentTrack] = useState<ITrack | undefined>(undefined);
    const [playList, setPlayList] = useState<ITrack[]>([]);

    // Слушатели
    useEffect(() => {
        audio.addEventListener('canplay', () => {
            if (!isPlay) {
                dispatch(setPlay());
            }
        })
    
        audio.addEventListener('ended', () => {
            if (!isRepeat) {
                dispatch(switchTrackAction('forward'));
            }
        });

        audio.addEventListener('timeupdate', () => {
            if (audio.currentTime !== undefined) {
                dispatch(setCurrentTime(audio.currentTime));
            }
        })

        return () => {
            audio.removeEventListener('canplay', () => {
                if (!isPlay) {
                    dispatch(setPlay());
                }
            })
        
            audio.removeEventListener('ended', () => {
                if (!isRepeat) {
                    dispatch(switchTrackAction('forward'));
                }
            });
    
            audio.removeEventListener('timeupdate', () => {
                if (audio.currentTime !== undefined) {
                    dispatch(setCurrentTime(audio.currentTime));
                }
            })
        }
    }, [])
    // Ивенты
    function nextTrack () {
        if (playList && currentTrack) {
            const currentIndex = playList.findIndex(item => item.id === currentTrack?.id);
            if (playList) {
                if (currentIndex >= playList.length - 1) {
                    dispatch(selectCurrentTrack(playList[0].id))
                } else {
                    dispatch(selectCurrentTrack(playList[currentIndex + 1].id))
                }
            }
        }   
    }

    function prevTrack () {
        const currentIndex = playList.findIndex(item => item.id === currentTrack?.id);

        if (playList) {
            if (currentIndex === 0) {
                dispatch(selectCurrentTrack(playList[playList.length - 1].id))
            } else {
                dispatch(selectCurrentTrack(playList[currentIndex - 1].id));
            }
        }
    }

    


    const postAudition = async (trackId) => {
        const postData = {
            trackId
        }

        try {
            fetch('https://music-server-production-d261.up.railway.app/api/tracks/addaudition/', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(postData)
            });
        } catch(error) {
            if (error) {
                if (error) {
                    const err = error as Error;
                    console.log(err.message);
                }
            }
        }
    }

    // Эффекты

    useEffect(() => {
        const getTrackData = async () => {
            try {
                dispatch(setPause());
                dispatch(setCurrentTime(0));
                dispatch(setPending(true));
                if (currentTrack) {
                    const response = await fetch(currentTrack.music);
                    const audioBlob = await response.blob();
                    dispatch(setAudioData(URL.createObjectURL(audioBlob)));
                    dispatch(setPending(false));
                }
            } catch (err) {
                if (err) {
                    const error = err as Error;
                    console.error(error);
                    dispatch(setPending(false));
                }
            }
        }

        getTrackData();
    }, [currentTrack, currentTrack?.music, dispatch]);

    useEffect(() => {
        if (shuffledArr.length !== 0) {
            setPlayList(shuffledArr);
        } else {
            setPlayList(currentPlayList);
        }
    }, [currentPlayList, shuffledArr]);

    useEffect(() => {
        if (playList.length !== 0 && currentTrack?.id !== trackId) {
            setCurrentTrack(playList.find(item => item.id === trackId));
        }
    }, [trackId, currentTrack, playList, dispatch]);
    
    useEffect(() => {
        if (isRandom) {
            dispatch(selectShuffledPlayList(shuffle(playList)))
            console.log('called');
        } else {
            dispatch(selectShuffledPlayList([]));
        }
    }, [dispatch, isRandom]);

    useEffect(() => {
        dispatch(setPause());
        if (audioData) {
            audio.src = audioData;
            audio.load();
        }
    }, [audio, audioData, dispatch]);
    
    useEffect(() => {
        if (currentTrack) {
            dispatch(setDuration(audio.duration));
        }
    }, [audio.duration, dispatch, currentTrack])

    useEffect(() => {
        if (isPlay) {
            if (audio.readyState >= 3) {
                audio.play();
            }
        } else {
            audio.pause();
        }
    }, [audio, isPlay]);
    
    useEffect(() => {
        if (rewind !== 'idle') {
            if (rewind === 'back') {
                audio.currentTime -= 5;
                dispatch(resetSomeStateData());
            } else {
                audio.currentTime += 5;
                dispatch(resetSomeStateData());
            }
        }
    }, [audio, dispatch, rewind]);

    useEffect(() => {
        if (rewindCurrentTime !== -1) {
            audio.currentTime = rewindCurrentTime;
            dispatch(resetSomeStateData());
        }
    }, [audio, rewindCurrentTime, dispatch]);

    useEffect(() => {
        if (isRepeat) {
            audio.loop = true;
        } else {
            audio.loop = false
        }
    }, [audio, isRepeat]);

    useEffect(() => {
        if (switchTrack !== 'idle') {
            if (switchTrack === 'forward') {
                nextTrack();
                dispatch(resetSomeStateData());
            } else {
                prevTrack();
                dispatch(resetSomeStateData());
            }
        }
    }, [dispatch, switchTrack]);

    useEffect(() => {
        if (currentPlayList.length !== 0 && !trackId) {
            dispatch(selectCurrentTrack(currentPlayList[0].id));
        }
    }, [currentPlayList, trackId, dispatch]);

    useEffect(() => {
        if (currentTrack) {
            postAudition(currentTrack.id);
        }
    }, [currentTrack]);

    return <></>
}

export default AudioModule;