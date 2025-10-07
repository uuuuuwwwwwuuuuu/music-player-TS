import { FC, SyntheticEvent, useEffect, useRef, useState } from "react";

import './fullScreen.scss';
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hook";
import { ITrack, toggleLike } from "../../store/likedPlayList/reducerLiked";
import { HomeTrackCard } from "../../components/cards/homeTrackCards/homeTrackCards";
import Button from "../../components/buttons/buttons";
import { CurrentPlayList, Like, PlayOrPause, Random, Repeat, Rewind, FullScreen as FullScreenIcon } from "../../components/icons and tags/icons";
import { setPause, setPlay, setRewindCurrentTime, switchTrackAction, toggleRandom, toggleRepeat } from "../../store/trackState/actionsTrackState";
import { humanizingNumbers } from "../PlaySelection/PlaySelection";
import { addNotification } from "../../store/notificationQueue/actionsNotification";
import { v4 as randomId } from 'uuid'; 
import { showCurrentPlayListAction } from "../../store/current/actionsCurrent";
import { useLocation, useNavigate } from "react-router-dom";

const Background = styled.div<{$img: string}>`
    height: calc(100svh - 70px);
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 70px 70px 0px 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${({$img}) => $img});
        background-size: cover;
        background-position: center;
        filter: blur(50px);
        opacity: 0.5;
        z-index: 1;
        pointer-events: none;
    }
`;

const CurrentPlayListSelection = styled.div<{$translateValue: number, $isCPLLong: boolean, $showCPL: boolean}>`
    flex: 0 0 320px;
    width: 100%;
    background-color: ${({theme}) => theme.mainBgBlur};
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    overflow: hidden;
    position: relative;
    top: 0;
    right: ${({$showCPL}) => $showCPL ? 0 : '-400px'};
    opacity: ${({$showCPL}) => $showCPL ? 1 : 0};
    pointer-events: ${({$showCPL}) => $showCPL ? '' : 'none'};
    transition: 0.8s ease all;
    
    &::after {
        content: '';
        position: absolute;
        right: -1px;
        top: 0;
        height: 100%;
        width: 70px;
        pointer-events: none;
        background: linear-gradient(90deg, rgba(43,42,45,0) 0%, rgba(43,42,45,1) 100%);
        z-index: 2;
        opacity: ${({$isCPLLong}) => $isCPLLong ? 1 : 0};
        transition: 0.5s ease all;
    }

    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 70px;
        pointer-events: none;
        background: linear-gradient(270deg, rgba(43,42,45,0) 0%, rgba(43,42,45,1) 100%);
        z-index: 2;
        opacity: ${({$translateValue}) => $translateValue ? 1 : 0};
        transition: 0.5s ease all;
    }
`;

const CurrentPlayListLine = styled.div<{$translateValue: number}>`
    width: max-content;
    display: flex;
    align-items: center;
    transition: 1s ease all;
    transform: translate(${({$translateValue}) => -$translateValue}px);

    > div {
        margin-right: 10px;
    }
`

const TrackTitle = styled.span<{$translate: number}>`
    font-size: 6.4rem;
    font-weight: 700;
    width: max-content;
    position: relative;
    transition: 2s ease all;
    left: ${({$translate}) => $translate}px;
    cursor: default;
`;

const ProgressBar = styled.div<{$progress: number, $isHovered: boolean}>`
    height: 7px;
    width: ${({$progress}) => $progress}%;
    background-color: ${({theme}) => theme.accent};
    border-radius: 100px;
    position: relative;
    transition: 0.5s ease all;

    &::after {
        content: '';
        position: absolute;
        top: -3px;
        right: -6px;
        width: 13px;
        height: 13px;
        background-color: ${({theme}) => theme.text};
        border-radius: 100px;
        transition: 0.2s ease all;
        opacity: ${({$isHovered}) => $isHovered ? 1 : 0};
    }
`

const TrackImg = styled.img<{$isShow: boolean}>`
    flex: 0 0 ${({$isShow}) => $isShow ? '500px' : '200px'};
    height: ${({$isShow}) => $isShow ? '500px' : '200px'};
    border-radius: 20px;
    margin-right: 20px;
    transition: 0.8s ease all;
`

const FullScreen: FC = () => {
    const dispatch = useAppDispatch();
    const {trackId, currentPlayList, showCurrentPlayList, shuffledArr} = useAppSelector(state => state.current);
    const {isPlay, isRandom, isRepeat, pending, trackTimeData: {currentTime, duration}} = useAppSelector(state => state.trackState);
    const {likedTrackList} = useAppSelector(state => state.liked);

    const [currentTrack, setCurrentTrack] = useState<ITrack | undefined>(undefined);  // Трек
    const [spanTranslateValue, setSpanTranslateValue] = useState(0);  //
    const [isSpanHovered, setIsSpanHovered] = useState(false);
    const [CPLTranslateValue, setCPLTranslateValue] = useState(0);
    const [isCPLLong, setIsCPLLong] = useState(false);
    const [isPBHovered, setIsPBHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(0);

    const infoDiv = useRef<HTMLDivElement | null>(null);  
    const trackTitleSpan = useRef<HTMLSpanElement | null>(null);
    const CPLSelectionRef = useRef<HTMLDivElement | null>(null);
    const CPLLineRef = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const renderCurrentPlayList = () => {
        if (shuffledArr.length !== 0) {
            return shuffledArr.map(item => {
                return <HomeTrackCard key={item.id} forFullScreen playList={currentPlayList} track={item} />
            });
        } else {
            return currentPlayList.map(item => {
                return <HomeTrackCard key={item.id} forFullScreen playList={currentPlayList} track={item} />
            })
        }
    }

    useEffect(() => {
        if (location.pathname === '/home/fullscreen') {
            if (!trackId) {
                navigate('/home');
            }
        }
    }, [trackId, location.pathname, navigate]);

    useEffect(() => {
        const likedTrack = likedTrackList.find(track => track.id === trackId)
        if (likedTrack) {
            setIsLiked(true);
        } else {
            setIsLiked(false)
        }
    }, [likedTrackList, trackId]);

    useEffect(() => {
        if (infoDiv.current && trackTitleSpan.current) {
            const wrapper = infoDiv.current;
            const span = trackTitleSpan.current;

            if ((wrapper.clientWidth < span.clientWidth) && isSpanHovered) {
                setSpanTranslateValue(wrapper.clientWidth - span.clientWidth);
            } else {
                setSpanTranslateValue(0);
            }
        }
    }, [isSpanHovered]);

    useEffect(() => {
        if (CPLSelectionRef.current && CPLLineRef.current) {
            const selection = CPLSelectionRef.current;
            const line = CPLLineRef.current;
            if (selection.clientWidth < line.clientWidth - CPLTranslateValue) {
                setIsCPLLong(true);
            } else {
                setIsCPLLong(false);
            }

        }
    }, [CPLSelectionRef.current?.clientWidth, CPLLineRef.current?.clientWidth, CPLTranslateValue]);


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

    // Ивенты
    useEffect(() => {
        if (currentTrack) {
            let trackIndex;
            if (shuffledArr.length !== 0) {
                trackIndex = shuffledArr.findIndex(item => item.id === currentTrack.id);
            } else {
                trackIndex = currentPlayList.findIndex(item => item.id === currentTrack.id);
            }
            if (trackIndex !== 0) {
                setCPLTranslateValue(260 * (trackIndex - 1));
            } else {
                setCPLTranslateValue(260 * trackIndex);
            }
        }
    }, [currentPlayList, currentTrack, shuffledArr]);

    const CPLTranslateToNext = () => {
        setCPLTranslateValue(prevState => {
            if (CPLSelectionRef.current) {
                const newValue = prevState + 260 * 2;
                if (CPLLineRef.current) {
                    console.log(CPLLineRef.current.clientWidth);
                    console.log(newValue);
                    if (newValue >= CPLLineRef.current.clientWidth - CPLSelectionRef.current.clientWidth) {
                        return CPLLineRef.current.clientWidth - CPLSelectionRef.current.clientWidth + 10;
                    }
                }
                return newValue;
            } else {
                return prevState
            }
        })
    }

    const CPLTranslateToPrev = () => {
        setCPLTranslateValue(prevState => {
            const newValue = prevState - 260 * 2;
            if (newValue <= 0) {
                return 0;
            }
            return newValue;
        })
    }

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
        const clientWidth = document.querySelector('.progress_bar_wrapper')?.clientWidth;
        if (clientWidth && duration) {
            const maxOffsetX = clientWidth - 1;
            const newTime = ((offsetX > maxOffsetX ? maxOffsetX : offsetX) / clientWidth) * duration;
            dispatch(setRewindCurrentTime(newTime));
        }
    }

    return (
        <>
            {(currentTrack && currentPlayList) &&
                <Background $img={currentTrack.albumImg}>
                    <div className="fullscreen_top_elements">
                        <TrackImg $isShow={showCurrentPlayList} src={currentTrack.albumImg} alt="фото альбома" />
                        <div className="fullscreen_info">
                            <CurrentPlayListSelection $showCPL={showCurrentPlayList} $isCPLLong={isCPLLong} $translateValue={CPLTranslateValue} ref={CPLSelectionRef}>
                                {CPLTranslateValue 
                                    ? <Button 
                                    type="alternative" 
                                    propClassList="fullscreen_prev_button"
                                    fontS={3}
                                    content='<' W={55} H={55}
                                    onClick={CPLTranslateToPrev} />
                                    : null}

                                <CurrentPlayListLine $translateValue={CPLTranslateValue} ref={CPLLineRef}>
                                    {renderCurrentPlayList()}
                                </CurrentPlayListLine>

                                {isCPLLong 
                                    && <Button 
                                        type="alternative" 
                                        propClassList="fullscreen_next_button"
                                        fontS={3}
                                        content='>' W={55} H={55}
                                        onClick={CPLTranslateToNext} />}
                            </CurrentPlayListSelection>
                            <div ref={infoDiv} className="fullscreen_track_info">
                                <TrackTitle 
                                    $translate={spanTranslateValue}
                                    onMouseEnter={() => setIsSpanHovered(true)}
                                    onMouseLeave={() => setIsSpanHovered(false)}
                                    ref={trackTitleSpan}>
                                        {currentTrack.title}</TrackTitle>
                                <span className="fullscreen_artist">{currentTrack.artists}</span>
                            </div>
                        </div>
                    </div>
                    <div className="fullscreen_bottom_elements">
                        <div className="fullscreen_controls">
                            <div>
                                <button onClick={toggleIsLiked} >
                                    <Like type={isLiked ? 'active' : 'idle'} scale={40}/>
                                </button>
                            </div>
                            <div style={{height: 70}}>
                                <button onClick={toggleIsRandom}>
                                    <Random type={isRandom ? 'active' : 'idle'} scale={30}/>
                                </button>
                                <button onClick={prevTrack}>
                                    <Rewind scale={40}/>
                                </button>
                                {pending 
                                    ? <div style={{marginRight: 40, width: 50, height: 50}} className="loader"></div>
                                    : <button style={{height: 70}} className="fullscreen_play_btn" onClick={toggleIsPlay}>
                                        <PlayOrPause type={isPlay ? 'active' : 'idle'}
                                        style={{left: isPlay ? 0 : 2}}
                                        className="play_or_pause_icon" scale={30}/>
                                    </button>}
                                <button onClick={nextTrack} >
                                    <Rewind style={{transform: 'rotate(180deg)'}} scale={40}/>
                                </button>
                                <button onClick={toggleIsRepeat}>
                                    <Repeat type={isRepeat ? 'active' : 'idle'} scale={30}/>
                                </button>
                            </div>
                            <div>
                                <button onClick={toggleShowCurrentPlayList} >
                                    <CurrentPlayList type={showCurrentPlayList ? 'active' : 'idle'} scale={35}/>
                                </button>
                                <button onClick={() => navigate(-1)}>
                                    <FullScreenIcon type="active" scale={35}/>
                                </button>
                            </div>
                        </div>
                        <div className="fullscreen_progress_controls">
                            <div className="time_wrapper">
                                <span>{humanizingNumbers(currentTime)}</span>
                                <span>{humanizingNumbers(duration)}</span>
                            </div>
                            <div 
                                className="progress_bar_wrapper"
                                onMouseEnter={() => setIsPBHovered(true)}
                                onMouseLeave={() => setIsPBHovered(false)}
                                onClick={setCurrentTime}>
                                    <ProgressBar $isHovered={isPBHovered} $progress={currentWidth} />
                            </div>
                        </div>
                    </div>
                </Background>
            }
        </>
    )
}

export default FullScreen;