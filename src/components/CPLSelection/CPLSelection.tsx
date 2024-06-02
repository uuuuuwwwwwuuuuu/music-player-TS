import { FC } from "react";

import './CPLSelection.scss';
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hook";
import SmallTrackCard from "../cards/smallTrackCard/smallTrackCard";
import { showCurrentPlayListAction } from "../../store/current/actionsCurrent";

const CPLSelectionComponent = styled.aside<{$isShow: boolean}>`
    position: fixed;
    width: 450px;
    border-radius: 15px;
    height: calc(100svh - 180px);
    top: 90px;
    right: ${({$isShow}) => $isShow ? '40px' : '-455px'};
    background-color: ${({theme}) => theme.secondBgBlur};
    backdrop-filter: blur(20px);
    border: 1px solid ${({theme}) => theme.border};
    z-index: 900;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;
    transition: 0.7s ease all;
`;

const TrackListWrapper = styled.div`
    width: 100%;
    flex: 1 1 360px;
    background-color: ${({theme}) => theme.mainBgBlur};
    border-radius: 10px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const BlurBg = styled.div<{$isShow: boolean}>`
    position: fixed;
    top: 80px;
    left: 0;
    width: 100svw;
    height: calc(100svh - 160px);
    backdrop-filter: blur(12px);
    z-index: 899;
    filter: brightness(60%);
    opacity: ${({$isShow}) => $isShow ? 1 : 0};
    pointer-events: ${({$isShow}) => $isShow ? 'click' : 'none'};
    transition: 0.7s ease all;
`

const CPLSelection: FC = () => {
    const {shuffledArr, currentPlayList, showCurrentPlayList} = useAppSelector(state => state.current);
    const dispatch = useAppDispatch();

    const setDefaultShowCPL = () => {
        dispatch(showCurrentPlayListAction(false));
    }

    const renderCPL = () => {
        if (shuffledArr.length !== 0) {
            return shuffledArr.map(item => {
                return <SmallTrackCard key={item.id} track={item} playList={shuffledArr} />
            })
        } else {
            return currentPlayList.map(item => {
                return <SmallTrackCard key={item.id} track={item} playList={currentPlayList} />
            })
        }
    }

    return (
        <>
            <CPLSelectionComponent $isShow={showCurrentPlayList} >
                <span className="title_span">Текущий плейлист</span>
                <TrackListWrapper>
                    {renderCPL()}
                </TrackListWrapper>
            </CPLSelectionComponent>
            <BlurBg onClick={setDefaultShowCPL} $isShow={showCurrentPlayList}></BlurBg>
        </>
    )
}

export default CPLSelection;