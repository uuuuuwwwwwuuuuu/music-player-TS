import { FC, useState, useEffect, SyntheticEvent } from "react";

import './PlaySelection.scss';

import { useAppDispatch, useAppSelector } from "../../hook";
import { showCurrentPlayListAction } from "../../store/current/actionsCurrent";

import { ITrack, toggleLike } from "../../store/likedPlayList/reducerLiked";

import { CurrentPlayList, FullScreen, Like, PlayOrPause, Random, Repeat, Rewind } from "../../components/icons and tags/icons";
import { setPause, setPlay, setRewindCurrentTime, switchTrackAction, toggleRandom, toggleRepeat } from "../../store/trackState/actionsTrackState";
import { addNotification } from "../../store/notificationQueue/actionsNotification";

import { v4 as randomId } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useTheme } from "styled-components";

export interface IKeyInfo {
    keyCode: string,
    shiftKey: boolean
}

export const humanizingNumbers = (time: number): string => {
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

const PlaySelection: FC = () => {
    const dispatch = useAppDispatch();
    const {currentPlayList, trackId, showCurrentPlayList} = useAppSelector(state => state.current);
    const {likedTrackList} = useAppSelector(state => state.liked);
    const {isRandom, isPlay, isRepeat, pending, trackTimeData: {currentTime, duration}} = useAppSelector(state => state.trackState)

    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentTrack, setCurrentTrack] = useState<ITrack | undefined>(undefined);
    
    const [isLiked, setIsLiked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const likedTrack = likedTrackList.find(track => track.id === trackId)
        if (likedTrack) {
            setIsLiked(true);
        } else {
            setIsLiked(false)
        }
    }, [likedTrackList, trackId]);

    useEffect(() => {
        if (currentPlayList.length !== 0 && currentTrack?.id !== trackId) {
            setCurrentTrack(currentPlayList.find(item => item.id === trackId));
        }
    }, [currentPlayList, currentTrack?.id, trackId]);


    useEffect(() => {
        if (currentPlayList.length === 1) {
            dispatch(toggleRepeat(true));
        }
    }, [currentPlayList, dispatch]);

    
    useEffect(() => {
        setCurrentWidth(currentTime * 100 / duration);
    }, [currentTime, duration]);

    //______________________________________________________
    const toggleIsLiked = () => {
        if (trackId && currentTrack) {
            dispatch(toggleLike(trackId));
            dispatch(addNotification({
                notificationId: randomId(),
                img: currentTrack.albumImg,
                info: `${currentTrack.title} - ${currentTrack.artists}`,
                additionalInfo: isLiked ? 'Трек удалён из <span>избранного</span>' : 'Трек добавлен в <span>избранное</span>'
            }));
        }
    }

    const toggleIsPlay = () => {
        if (currentTrack) {
            if (isPlay) {
                dispatch(setPause());
            } else {
                dispatch(setPlay());
            }
        }
    }

    const toggleShowCurrentPlayList = () => {
        if (currentPlayList) {
            dispatch(showCurrentPlayListAction(!showCurrentPlayList));
        }
    }
    
    const toggleIsRepeat = () => {
        if (isRepeat) {
            dispatch(toggleRepeat(false));
        } else {
            dispatch(toggleRepeat(true))
        }
    }

    const toggleIsRandom = () => {
        if (currentTrack) {
            if (isRandom) {
                dispatch(toggleRandom(false));
            } else {
                dispatch(toggleRandom(true));
            }
        }
    }

    const prevTrack = () => {
        dispatch(switchTrackAction('back'));
    }

    const nextTrack = () => {
        dispatch(switchTrackAction('forward'));
    }

    const setCurrentTime = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
        const offsetX = e.nativeEvent.offsetX;
        const clientWidth = document.querySelector('.music_progress')?.clientWidth;
        if (clientWidth && duration) {
            const maxOffsetX = clientWidth - 1;
            const newTime = ((offsetX > maxOffsetX ? maxOffsetX : offsetX) / clientWidth) * duration;
            dispatch(setRewindCurrentTime(newTime));
        }
    }

    return (
        <>
            {currentTrack &&
                <div className="play_selection" >
                    <div className="left_elements" onClick={() => navigate('/home/fullscreen')}>
                        <div className="album_img_wrapper">
                            {pending
                                ? <div className="loader"></div>
                                : <img className="album_img" src={currentTrack.albumImg} alt="album" />}
                            
                        </div>
                        <div className="track_info">
                            <span>{currentTrack.title}</span>
                            <span className="artists">{currentTrack.artists}</span>
                        </div>
                    </div>
                    <div className="right_elements">
                        <div className="music_controls">
                            <div className="left_controls">
                                <button onClick={toggleIsLiked} className="control">
                                    <Like type={isLiked ? 'active' : 'idle'}/>
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
                                <button className="current_play_list_control" onClick={toggleShowCurrentPlayList}>
                                    <CurrentPlayList 
                                        type={currentTrack ? (showCurrentPlayList ? 'active' : 'idle') : 'disable'} />
                                </button>
                                <button onClick={() => navigate('/home/fullscreen')} 
                                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <FullScreen type={"idle"}/>
                                </button>
                            </div>
                        </div>
                        <div className="additional_track_info">
                            {currentTrack && <span className="time">{humanizingNumbers(currentTime)}</span>}
                            <div className={"music_progress"} onClick={setCurrentTime}>
                                <div className="progress_bar" style={{width: currentWidth + '%'}}>
                                    <div className="target_circle"></div>
                                </div>
                            </div>
                            {currentTrack && <span className="time">{humanizingNumbers(duration)}</span>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PlaySelection;