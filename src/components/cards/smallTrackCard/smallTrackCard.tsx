import { FC, useEffect, useState } from "react";
import './smallTrackCard.scss';
import styled from "styled-components";
import { Cross, Like } from "../../icons and tags/icons";
import { ITrack, toggleLike } from "../../../store/likedPlayList/reducerLiked";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { deleteCurrentTrack, selectCurrentTrack, selectPlayList } from "../../../store/current/actionsCurrent";
import { addNotification } from "../../../store/notificationQueue/actionsNotification";
import { v4 as randomId } from 'uuid';

interface ISmallTrackListProps {
    track: ITrack,
    playList: ITrack[],
    isLiked?: boolean
}

const TrackItemWrapper = styled.div<{$isLiked: boolean}>`
    box-sizing: border-box;
    width: ${({$isLiked}) => $isLiked ? '360px' : '410px'};
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    cursor: pointer;
`;

const ImgWrapper = styled.div<{$img: string}>`
    width: 40px;
    height: 40px;
    background-image: url(${({$img}) => $img});
    background-position: center;
    background-size: cover;
    border-radius: 5px;
`;

const TrackInfoWrapper = styled.div`
    flex: 1 0 200px;
    display: flex;
    align-items: center;
`

const SmallTrackCard: FC<ISmallTrackListProps> = ({track, playList, isLiked=false}) => {
    const dispatch = useAppDispatch();
    const currentTrackId = useAppSelector(state => state.current.trackId);

    const deleteLike = () => {
        dispatch(toggleLike(track.id));
        dispatch(addNotification({
            img: track.albumImg,
            info: `${track.title} - ${track.artists}`,
            additionalInfo: 'Трек удалён из <span>избранного</span>',
            notificationId: randomId()
        }));
    }

    const deleteCurrent = () => {
        dispatch(deleteCurrentTrack(track.id));
    }

    const setCurrent = () => {
        dispatch(selectCurrentTrack(track.id));
        dispatch(selectPlayList(playList));
    }

    return (
        <TrackItemWrapper $isLiked={isLiked}>
            <TrackInfoWrapper onClick={setCurrent}>
                <ImgWrapper $img={track.albumImg}></ImgWrapper>
                <div className="small_track_item_info">
                    <span>{track.title}</span>
                    <span>{track.artists}</span>
                </div>
            </TrackInfoWrapper>
            <button onClick={deleteLike}>
                <Like type="active"/>
            </button>
            {!isLiked && currentTrackId !== track.id &&
                <button onClick={deleteCurrent}>
                    <Cross />
                </button>
            }
        </TrackItemWrapper>
    )
}

export default SmallTrackCard;