import { FC, useState, useEffect, SyntheticEvent, useRef } from "react";
import './PlaySelection.scss';
import { FaRandom } from "react-icons/fa";
import { BsFillRewindFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { LuRepeat } from "react-icons/lu";
import { LuRepeat1 } from "react-icons/lu";
import { RiPlayListFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../hook";
import { ITrack } from "../../store/likedPlayList/reducerLiked";
import { selectCurrentTrack, selectShuffledPlayList, showCurrentPlayListAction } from "../../store/current/actionsCurrent";

interface props {
    toggleIsFullScreen: (isFullScreen: boolean) => void
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

    const audioRef = useRef<HTMLAudioElement>(null);

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
    }, [currentPlayList])

    useEffect(() => {
        if (currentPlayList.length !== 0 && currentTrack?.id !== trackId) {
            setCurrentTrack(currentPlayList.find(item => item.id === trackId));
        }

        if (currentTrack?.id !== trackId) {
            setIsPlay(true);
        }
        
        if (audioRef.current) {
            audioRef.current.loop = isRepeat;
            audioRef.current.addEventListener('canplay', handleCanPlay, { once: true });
        }
    
    }, [trackId, currentTrack, currentPlayList, isRepeat]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlay) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlay]);

    useEffect(() => {
        if (isRandom) {
            dispatch(selectShuffledPlayList(shuffle(currentPlayList)))
        } else {
            dispatch(selectShuffledPlayList([]));
        }
    }, [isRandom])

    const disableClassList = currentTrack ? '' : ' disable';
    const randomClassList = isRandom ? 'control active' : 'control';
    const showCurrentPlayListClassList = showCurrentPlayList ? ' active' : ''
    const fullScreenClassList = isFullScreen ? 'full_screen' : ''

    //______________________________________________________
    const toggleIsPlay = () => {
        if (currentTrack) {
            setIsPlay(!isPlay);
        }
    }

    const toggleShowCurrentPlayList = () => {
        if (currentPlayList) {
            dispatch(showCurrentPlayListAction(!showCurrentPlayList));
        }
    }

    const handleCanPlay = () => {
        if (currentTrack) {
            if (isPlay) {
                audioRef.current?.play();
            }
        }
    }

    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
        toggleIsFullScreen(!isFullScreen)
    }
    
    const toggleIsRepeat = () => {
        if (currentPlayList.length !== 1 ) {
            setIsRepeat(!isRepeat);
        }
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

        if (!disableClassList) {
            if (currentIndex === 0) {
                dispatch(selectCurrentTrack(currentPlayList[currentPlayList.length - 1].id))
            } else {
                dispatch(selectCurrentTrack(currentPlayList[currentIndex - 1].id));
            }
        }
    }

    const nextTrack = () => {
        const currentIndex = currentPlayList.findIndex(item => item.id === currentTrack?.id);

        if (!disableClassList) {
            if (currentIndex >= currentPlayList.length - 1) {
                dispatch(selectCurrentTrack(currentPlayList[0].id))
            } else {
                dispatch(selectCurrentTrack(currentPlayList[currentIndex + 1].id))
            }
        }
    }

    const onUpdateCurrentTime = (e: SyntheticEvent<HTMLAudioElement>) => {
        const audio = e.target as HTMLAudioElement;
        const {currentTime, duration} = audio

        setCurrentWidth(currentTime * 100 / duration);
    }

    const setCurrentTime = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
        const {current: song} = audioRef;
        const offsetX = e.nativeEvent.offsetX;
        const clientWidth = document.querySelector('.music_progress')?.clientWidth;

        if (song && clientWidth) {
            song.currentTime = (offsetX / clientWidth) * song.duration;
        }
    }

    const onEnd = () => {
        if (!isRepeat) {
            nextTrack();
        }
    }

    // useEffect(() => {
    //     let currentTime = audioRef.current?.currentTime
    //     const handleKeyDown = (e) => {
    //         if (e.shiftKey && e.code === 'ArrowRight') {
    //             nextTrack();
    //         }
    
    //         if (e.shiftKey && e.code === 'ArrowLeft') {
    //             prevTrack();
    //         }
    
    //         switch (e.code) {
    //             case 'KeyR':
    //                 toggleIsRepeat();
    //                 break;
    //             case 'KeyP':
    //                 toggleShowCurrentPlayList();
    //                 break;
    //             case 'KeyN':
    //                 toggleIsRandom();
    //                 break;
    //             case 'Space':
    //                 console.log('hih');
    //                 toggleIsPlay();
    //                 break;
    //             case 'ArrowRight':
    //                 if (currentTime) {
    //                     currentTime = currentTime + 5;
    //                 }
    //                 break;
    //             case 'ArrowLeft':
    //                 if (currentTime) {
    //                     currentTime = currentTime - 5;
    //                 }
    //                 break;
    //             case 'KeyF':
    //                 toggleFullScreen();
    //                 break;
    //         }
    //     };

    //     document.body.addEventListener('keydown', handleKeyDown);
    // });



    return (
        <div className={fullScreenClassList}>
            <div className="play_selection" >
                {
                    currentTrack &&
                    <div onClick={toggleFullScreen} className="left_elements">
                        <img src={currentTrack.albumImg} alt="album" />
                        <div className="track_info">
                            <span>{currentTrack.title}</span>
                            <span className="artists">{currentTrack.artists}</span>
                            {isFullScreen && <div className="track_text"></div>}
                        </div>
                        <audio ref={audioRef} onEnded={onEnd} onTimeUpdate={onUpdateCurrentTime} src={currentTrack.music} />
                    </div>
                }
                <div className="right_elements">
                    <div className="music_controls">
                        <button>
                            <FaRandom className={randomClassList + disableClassList} onClick={toggleIsRandom}/>
                        </button>
                        <button className="control">
                            <BsFillRewindFill className={disableClassList} onClick={prevTrack}/>
                        </button>
                        <button style={{display: isPlay ? 'none' : 'inline-block'}} className="control play">
                            <FaPlay onClick={toggleIsPlay} className={ disableClassList} />
                        </button>
                        <button className="control" style={{display: !isPlay ? 'none' : 'inline-block'}}>
                            <FaPause onClick={toggleIsPlay} className={disableClassList} />
                        </button>
                        <button className="control next_rewind">
                            <BsFillRewindFill className={disableClassList} onClick={nextTrack}/>
                        </button>
                        <button style={{display: isRepeat ? 'none' : 'inline-block'}} className="control">
                            <LuRepeat onClick={toggleIsRepeat} className={disableClassList} />
                        </button>
                        <button style={{display: !isRepeat ? 'none' : 'inline-block'}} className="control repeat">
                            <LuRepeat1 onClick={toggleIsRepeat} className='active_repeat' />
                        </button>
                        <button className="current_play_list_control" onClick={toggleShowCurrentPlayList}>
                            <RiPlayListFill className={disableClassList + showCurrentPlayListClassList}/>
                        </button>
                    </div>
                    <div className={"music_progress" + disableClassList} onClick={setCurrentTime}>
                        <div className="progress_bar" style={{width: currentWidth + '%'}}>
                            <div className="target_circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaySelection;