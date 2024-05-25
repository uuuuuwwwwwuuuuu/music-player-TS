import { FC, useEffect, useRef, useState } from "react";

import './fullScreen.scss';
import styled, { keyframes } from "styled-components";
import { useAppSelector } from "../../hook";
import { ITrack } from "../../store/likedPlayList/reducerLiked";
import { HomeTrackCard } from "../../components/cards/homeTrackCards/homeTrackCards";
import Button from "../../components/buttons/buttons";
import { CurrentPlayList, Like, PlayOrPause, Random, Repeat, Rewind, FullScreen as FullScreenIcon } from "../../components/icons and tags/icons";

const Background = styled.div<{$img: string}>`
    height: 100svh;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 70px;
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

const CurrentPlayListSelection = styled.div<{$translateValue: number, $isCPLLong: boolean}>`
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
    
    &::after {
        content: '';
        position: absolute;
        right: 0;
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

const FullScreen: FC = () => {
    //ТО, ЧТО НУЖНО БУДЕТ ВНЕДРИТЬ, ДЛЯ ТЕСТА БУДЕТ ИСПОЛЬЗОВАТЬСЯ КОД НИЖЕ
    // const {trackId, currentPlayList} = useAppSelector(state => state.current);
    // __________________________________________________________________________

    const {likedTrackList: currentPlayList} = useAppSelector(state => state.liked);
    const [trackId, setTrackId] = useState<string | null>(null);

    useEffect(() => {
        if (currentPlayList.length !== 0) {
            setTrackId(currentPlayList[0].id);
        }
    }, [currentPlayList]);

    // __________________________________________________________________________

    const [currentTrack, setCurrentTrack] = useState<ITrack | undefined>(undefined);
    const [spanTranslateValue, setSpanTranslateValue] = useState(0);
    const [isSpanHovered, setIsSpanHovered] = useState(false);
    const [CPLTranslateValue, setCPLTranslateValue] = useState(0);
    const [isCPLLong, setIsCPLLong] = useState(false);
    const [isPBHovered, setIsPBHovered] = useState(false);

    const infoDiv = useRef<HTMLDivElement | null>(null);
    const trackTitleSpan = useRef<HTMLSpanElement | null>(null);
    const CPLSelectionRef = useRef<HTMLDivElement | null>(null);
    const CPLLine = useRef<HTMLDivElement | null>(null);

    // Логика по работе с рендером и адаптивом

    // Рендер
    const renderCurrentPlayList = () => {
        return currentPlayList.map(item => {
            if (item.id === trackId) {
                return null;
            } else {
                return <HomeTrackCard key={item.id} playList={currentPlayList} track={item} />
            }
        })
    }

    // Адаптив
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
        if (CPLSelectionRef.current && CPLLine.current) {
            const selection = CPLSelectionRef.current;
            const line = CPLLine.current;
            if (selection.clientWidth < line.clientWidth - CPLTranslateValue) {
                setIsCPLLong(true);
            } else {
                setIsCPLLong(false);
            }

        }
    }, [CPLSelectionRef.current?.clientWidth, CPLLine.current?.clientWidth, CPLTranslateValue]);


    // Логика по работе с звуком
    useEffect(() => {
        if (currentPlayList.length !== 0 && currentTrack?.id !== trackId) {
            setCurrentTrack(currentPlayList.find(item => item.id === trackId));
        }
    }, [currentPlayList, currentTrack?.id, trackId]);

    // Ивенты
    const CPLTranslateToNext = () => {
        setCPLTranslateValue(prevState => {
            if (CPLSelectionRef.current) {
                return prevState + CPLSelectionRef.current.clientWidth - 100;
            } else {
                return prevState
            }
        })
    }
    
    const CPLTranslateToPrev = () => {
        setCPLTranslateValue(prevState => {
            if (CPLSelectionRef.current) {
                return prevState - CPLSelectionRef.current.clientWidth + 100;
            } else {
                return prevState
            }
        })
    }

    return (
        <>
            {(currentTrack && currentPlayList) &&
                <Background $img={currentTrack.albumImg}>
                    <div className="fullscreen_top_elements">
                        <img src={currentTrack.albumImg} alt="фото альбома" />
                        <div className="fullscreen_info">
                            <CurrentPlayListSelection $isCPLLong={isCPLLong} $translateValue={CPLTranslateValue} ref={CPLSelectionRef}>
                                {CPLTranslateValue 
                                    ? <Button 
                                    type="alternative" 
                                    propClassList="fullscreen_prev_button"
                                    fontS={3}
                                    content='<' W={55} H={55}
                                    onClick={CPLTranslateToPrev} />
                                    : null}

                                <CurrentPlayListLine $translateValue={CPLTranslateValue} ref={CPLLine}>
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
                                <button>
                                    <Like scale={40}/>
                                </button>
                            </div>
                            <div style={{height: 70}}>
                                <button>
                                    <Random scale={30}/>
                                </button>
                                <button>
                                    <Rewind scale={40}/>
                                </button>
                                <button style={{height: 70}} className="fullscreen_play_btn">
                                    <PlayOrPause className="play_or_pause_icon" scale={30}/>
                                </button>
                                <button >
                                    <Rewind style={{transform: 'rotate(180deg)'}} scale={40}/>
                                </button>
                                <button>
                                    <Repeat scale={30}/>
                                </button>
                            </div>
                            <div>
                                <button>
                                    <CurrentPlayList scale={35}/>
                                </button>
                                <button>
                                    <FullScreenIcon scale={35}/>
                                </button>
                            </div>
                        </div>
                        <div className="fullscreen_progress_controls">
                            <div className="time_wrapper">
                                <span>0:00</span>
                                <span>3:25</span>
                            </div>
                            <div 
                                className="progress_bar_wrapper"
                                onMouseEnter={() => setIsPBHovered(true)}
                                onMouseLeave={() => setIsPBHovered(false)}>
                                    <ProgressBar $isHovered={isPBHovered} $progress={54} />
                            </div>
                        </div>
                    </div>
                </Background>
            }
        </>
    )
}

export default FullScreen;