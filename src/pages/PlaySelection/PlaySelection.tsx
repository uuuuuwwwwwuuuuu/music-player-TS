import { FC, useState, useEffect, SyntheticEvent, useRef, ReactNode } from "react";

import './PlaySelection.scss';

import { useAppDispatch, useAppSelector } from "../../hook";
import { selectCurrentTrack, selectShuffledPlayList, showCurrentPlayListAction } from "../../store/current/actionsCurrent";

import { ITrack } from "../../store/likedPlayList/reducerLiked";

import { AddToPlayList, CurrentPlayList, FullScreen, Like, PlayOrPause, Random, Repeat, Rewind } from "../../components/icons and tags/icons";

interface props {
    toggleIsFullScreen: (isFullScreen: boolean) => void
}

interface IKeyInfo {
    keyCode: string,
    shiftKey: boolean
}

const postAudition = async (trackId) => {
    const postData = {
        trackId
    }

    try {
        fetch('http://127.0.0.1:8000/api/tracks/addaudition/', {
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

const PlaySelection: FC<props> = ({toggleIsFullScreen}) => {
    const {currentPlayList: playList, trackId, shuffledArr, showCurrentPlayList} = useAppSelector(state => state.current);
    const dispatch = useAppDispatch();

    const [isPlay, setIsPlay] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentTrack, setCurrentTrack] = useState<ITrack | undefined>(undefined);
    const [isRepeat, setIsRepeat] = useState(false);
    const [currentPlayList, setCurrentPlayList] = useState<ITrack[]>([]);
    const [isRandom, setIsRandom] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [key, setKey] = useState<IKeyInfo | null>(null);
    const [humanizedTime, setHumanizedTime] = useState<string>('00:00');
    // const [randomTrackPoint, setRandomTrackPoint] = useState<number | null>(null);
    const [audioData, setAudioData] = useState<string | null>(null);
    const [audio, _] = useState(new Audio());

    useEffect(() => {
        const getTrackData = async () => {
            try {
                if (currentTrack) {
                    const response = await fetch(currentTrack.music);
                    const audioBlob = await response.blob();
                    setAudioData(URL.createObjectURL(audioBlob));
                }
            } catch (err) {
                if (err) {
                    const error = err as Error;
                    console.error(error)
                }
            }
        }

        getTrackData();

        return () => {
            if (audioData) {
                URL.revokeObjectURL(audioData);
            }
        }
    }, [currentTrack?.music]);

    useEffect(() => {
        if (audioData) {
            audio.src = audioData;
            audio.load();
        }
    }, [audioData, audio]);

    useEffect(() => {
        const handleCanPlay = () => {
            audio.play();
        }

        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('ended', onEnd);
        audio.addEventListener('timeupdate', onUpdateCurrentTime);

        return () => {
            audio.removeEventListener('canplay', handleCanPlay);
        }
    });

    useEffect(() => {
        if (shuffledArr.length !== 0) {
            setCurrentPlayList(shuffledArr);
        } else {
            setCurrentPlayList(playList);
        }
    }, [playList, shuffledArr]);

    useEffect(() => {
        if (currentPlayList.length === 1) {
            setIsRepeat(true);
        }
    }, [currentPlayList]);

    useEffect(() => {
        if (currentTrack) {
            postAudition(currentTrack.id);
        }
    }, [currentTrack]);

    useEffect(() => {
        if (currentPlayList.length !== 0 && currentTrack?.id !== trackId) {
            setCurrentTrack(currentPlayList.find(item => item.id === trackId));
        }

        if (currentTrack?.id !== trackId) {
            setIsPlay(true);
        }

        audio.loop = isRepeat ? true : false
    }, [trackId, currentTrack, currentPlayList, isRepeat]);

    useEffect(() => {
        if (currentTrack && audio.readyState >= 3) {
            if (isPlay) {
                audio.play();
            } else {
                audio.pause();
            }
        }
    }, [isPlay, currentTrack, audio]);

    useEffect(() => {
        if (isRandom) {
            dispatch(selectShuffledPlayList(shuffle(currentPlayList)))
        } else {
            dispatch(selectShuffledPlayList([]));
        }
    }, [isRandom])

    const fullScreenClassList = isFullScreen ? 'full_screen' : ''

    //______________________________________________________
    const toggleIsPlay = () => {
        if (currentTrack) {
            setIsPlay(!isPlay);
        }
    }

    const toggleShowCurrentPlayList = () => {
        if (currentPlayList && !isFullScreen) {
            dispatch(showCurrentPlayListAction(!showCurrentPlayList));
        }
    }

    const toggleFullScreen = () => {
        if (!showCurrentPlayList && playList.length > 0) {
            setIsFullScreen(!isFullScreen);
            toggleIsFullScreen(!isFullScreen)
        }
    }
    
    const toggleIsRepeat = () => {
        setIsRepeat(!isRepeat);
    }

    const toggleIsRandom = () => {
        if (currentTrack) {
            setIsRandom(!isRandom);
        }
    }

    const shuffle = (array: ITrack[]): ITrack[] => {
        const shuffledArray = [...array];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
    
        return shuffledArray;
    };

    const prevTrack = () => {
        const currentIndex = currentPlayList.findIndex(item => item.id === currentTrack?.id);

        if (currentPlayList) {
            if (currentIndex === 0) {
                dispatch(selectCurrentTrack(currentPlayList[currentPlayList.length - 1].id))
            } else {
                dispatch(selectCurrentTrack(currentPlayList[currentIndex - 1].id));
            }
        }
    }

    const nextTrack = () => {
        if (currentPlayList && currentTrack) {
            const currentIndex = currentPlayList.findIndex(item => item.id === currentTrack?.id);
            
            if (currentPlayList) {
                if (currentIndex >= currentPlayList.length - 1) {
                    dispatch(selectCurrentTrack(currentPlayList[0].id))
                } else {
                    dispatch(selectCurrentTrack(currentPlayList[currentIndex + 1].id))
                }
            }
        }
        
    }

    const humanizingNumbers = (time: number): string => {
        if (time) {
            const roundedTime = Math.trunc(time);
            const minutes = Math.floor(roundedTime / 60);
            const seconds = roundedTime % 60;
            
            let minutesStr = '';
            let secondsStr = '';
    
            if (minutes < 10) {
                minutesStr = `0${minutes}`;
            } else {
                minutesStr = `${minutes}`;
            }
    
            if (seconds < 10) {
                secondsStr = `0${seconds}`;
            } else {
                secondsStr = `${seconds}`
            }
            return `${minutesStr}:${secondsStr}`;
        } else {
            return '00:00'
        }
    }

    const onUpdateCurrentTime = () => {
        const {currentTime, duration} = audio

        setCurrentWidth(currentTime * 100 / duration);
        setHumanizedTime(humanizingNumbers(currentTime));
    }

    const setCurrentTime = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
        const song = audio;
        const offsetX = e.nativeEvent.offsetX;
        const clientWidth = document.querySelector('.music_progress')?.clientWidth;
        if (song && clientWidth && song.readyState >= 4 && song.duration) {
            const maxOffsetX = clientWidth - 1;
            const newTime = ((offsetX > maxOffsetX ? maxOffsetX : offsetX) / clientWidth) * song.duration;
            song.currentTime = newTime
        }
    }

    const onEnd = () => {
        if (!isRepeat) {
            nextTrack();
        }
    }

    useEffect(() => {
        if (key) {
            if (key.shiftKey && key?.keyCode === 'ArrowRight') {
                nextTrack();
            }
    
            if (key.shiftKey && key?.keyCode === 'ArrowLeft') {
                prevTrack();
            }
            switch (key.keyCode) {
                case 'KeyR':
                    toggleIsRepeat();
                    break;
                case 'KeyP':
                    toggleShowCurrentPlayList();
                    break;
                case 'KeyN':
                    toggleIsRandom();
                    break;
                case 'Space':
                    toggleIsPlay();
                    break;
                case 'ArrowRight':
                    audio.currentTime += 5;
                    break;
                case 'ArrowLeft':
                    audio.currentTime -= 5;
                    break;
                case 'KeyF':
                    toggleFullScreen();
                    break;
            }
            setKey(null);
        }
    }, [key])

    useEffect(() => {
        document.body.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
            }
            if (e.shiftKey) {
                setKey({
                    keyCode: e.code,
                    shiftKey: true
                });
            } else {
                setKey({
                    keyCode: e.code,
                    shiftKey: false
                })
            }
        });
    }, []);

    return (
        <div className={fullScreenClassList}>
            {currentTrack &&
                <div className="play_selection" >
                    <div className="left_elements">
                        <img className="album_img" src={currentTrack.albumImg} alt="album" />
                        <div className="track_info">
                            <span>{currentTrack.title}</span>
                            <span className="artists">{currentTrack.artists}</span>
                        </div>
                    </div>
                    <div className="right_elements">
                        <div className="music_controls">
                            <div className="left_controls">
                                <button className="control">
                                    <Like type={currentTrack ? 'idle' : 'disable'}/>
                                </button>
                            </div>
                            <div className="center_controls">
                                <button className="control" onClick={toggleIsRandom}>
                                    <Random type={currentTrack ? (isRandom ? 'active' : 'idle') : 'disable'} />
                                </button>
                                <button className="control" onClick={prevTrack}>
                                    <Rewind type={currentTrack ? 'idle' : 'disable'}/>
                                </button>
                                <button className="control" onClick={toggleIsPlay}>
                                    <PlayOrPause type={currentTrack ? (isPlay ? 'active' : 'idle') : 'disable'} />
                                </button>
                                <button className="control next_rewind" style={{transform: 'rotate(180deg)'}} onClick={nextTrack}>
                                    <Rewind type={currentTrack ? 'idle' : 'disable'} />
                                </button>
                                <button className="control" onClick={toggleIsRepeat}>
                                    <Repeat type={currentTrack ? (isRepeat ? 'active' : 'idle') : 'disable'} />
                                </button>
                            </div>
                            <div className="right_controls">
                                <button>
                                    <AddToPlayList type={currentTrack ? 'idle' : "disable"} />
                                </button>
                                <button className="current_play_list_control" onClick={toggleShowCurrentPlayList}>
                                    <CurrentPlayList 
                                        type={currentTrack ? (showCurrentPlayList ? 'active' : 'idle') : 'disable'} />
                                </button>
                                <button onClick={toggleFullScreen} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <FullScreen type={isFullScreen ? 'active' : "idle"}/>
                                </button>
                            </div>
                        </div>
                        <div className="additional_track_info">
                            {currentTrack && <span className="time">{humanizedTime}</span>}
                            <div className={"music_progress"} onClick={setCurrentTime}>
                                <div className="progress_bar" style={{width: currentWidth + '%'}}>
                                    <div className="target_circle"></div>
                                </div>
                            </div>
                            {currentTrack && <span className="time">{humanizingNumbers(audio.duration)}</span>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PlaySelection;