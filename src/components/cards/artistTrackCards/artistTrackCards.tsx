import { FC, useEffect, useState } from "react";

import './artistTrackCards.scss';

import styled from "styled-components";
import Button from "../../buttons/buttons";
import { ITrack, toggleLike } from "../../../store/likedPlayList/reducerLiked";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { addToCurrentPlayList, selectCurrentTrack, selectPlayList } from "../../../store/current/actionsCurrent";
import {AddToPlayList, Like, PlayingTrackTag } from "../../icons and tags/icons";
import { addNotification } from "../../../store/notificationQueue/actionsNotification";
import { v4 as randomId } from 'uuid'
import { MdErrorOutline } from "react-icons/md";

interface IProp {
    playList: ITrack[],
    track: ITrack
}

const BackgroundImg = styled.div<{$albumImg: string, $isHover: boolean}>`
    background-image: url(${props => props.$albumImg});
    width: ${({$isHover}) => $isHover ? '70%' : '100%'};
    height: 100%;
    border-radius: 7px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    z-index: 3;
    transition: 0.5s ease all;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        font-size: 3.6rem;
        font-weight: 700;
        position: absolute;
        transition: 0.4s ease all;
        bottom: 10px;
        width: 90%;
        z-index: 2;
        opacity: ${({$isHover}) => $isHover ? 0 : 1};
        left: ${({$isHover}) => $isHover ? '-20%' : '20px'};
    }
`;

const TrackItemInfo = styled.div<{$isHovered: boolean}>`
    width: ${({$isHovered}) => $isHovered ? '30%' : '0%'};
    transition: 0.5s ease all;
    position: relative;
    &:before {
        content: '';
        position: absolute;
        height: 100%;
        width: 70px;
        background: linear-gradient(90deg, rgba(43,42,45,0) 0%, rgba(43,42,45,1) 100%);
        left: -70px;
        transition: 0.4s ease all;
        z-index: 3;
        opacity: ${({$isHovered}) => $isHovered ? 1 : 0};
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;

    @media (hover: hover) {
        button:hover {
            svg {
                color: ${({theme}) => theme.accent}
            }
        }
    }
    svg {
        position: relative;
        top: 1px;
    }
`

const PlayingTagWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    backdrop-filter: blur(10px);
    background-color: ${({theme}) => theme.mainBgBlur};
`;

const ArtistTrackCard: FC<IProp> = ({track, playList}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {trackId} = useAppSelector(state => state.current);
    const {likedTrackList} = useAppSelector(state => state.liked)
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const {currentPlayList} = useAppSelector(state => state.current)

    const {albumImg, id, title, auditions} = track;
    const setCurrentTrack = () => {
        dispatch(selectCurrentTrack(id));
        dispatch(selectPlayList(playList));
    }


    useEffect(() => {
        const likedTrack = likedTrackList.find(track => track.id === id)
        if (likedTrack) {
            setIsLiked(true);
        } else {
            setIsLiked(false)
        }
    }, [likedTrackList, id]);

    const toggleIsLiked = () => {
        dispatch(toggleLike(id));
        dispatch(addNotification({
            notificationId: randomId(),
            img: track.albumImg,
            info: `${track.title} - ${track.artists}`,
            additionalInfo: isLiked ? 'Трек удалён из <span>избранного</span>' : 'Трек добавлен в <span>избранное</span>'
        }));
    }

    const addToPlayList = () => {
        const arrOfId = currentPlayList.map(item => item.id);
        if (!arrOfId.includes(id)) {
            dispatch(addToCurrentPlayList(track));
            dispatch(addNotification({
                notificationId: randomId(),
                img: track.albumImg,
                info: `${track.title} - ${track.artists}`,
                additionalInfo: "Трек добавлен в <span>текущий плейлист</span>"
            }));
        } else {
            dispatch(addNotification({
                notificationId: randomId(),
                img: <MdErrorOutline style={{color: '#C84141'}} />,
                info: `${track.title} - ${track.artists}`,
                additionalInfo: "Трек уже добавлен в <span>текущий плейлист</span>"
            }));
        }
    }

    return (
        <div style={{flexBasis: isHovered ? '60%' : '35%'}} className="popular_track_item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <BackgroundImg $albumImg={albumImg} $isHover={isHovered} onClick={setCurrentTrack}>
                {trackId === id &&
                    <PlayingTagWrapper>
                        <PlayingTrackTag height={50}/>
                    </PlayingTagWrapper>
                }
                <span>{title}</span>
            </BackgroundImg>
            <TrackItemInfo $isHovered={isHovered}>
                <>
                    <div style={{opacity: isHovered ? 1 : 0}} className="track_item_info">
                        <span>{title}</span>
                        <span>{auditions} прослушиваний</span>
                    </div>
                    <div style={{opacity: isHovered ? 1 : 0}} className="track_item_action_buttons">
                        <ButtonsWrapper>
                            <Button type="simple" W={70} H={30} fontS={1.1} fontW={600} 
                                content={<AddToPlayList />} style={{marginBottom: 10}}
                                onClick={addToPlayList}/>
                            <Button type="simple" W={70} H={30} fontS={1.1} fontW={600} 
                                content={<Like type={isLiked ? 'active' : 'idle'}/>} 
                                style={{marginBottom: 10}} onClick={toggleIsLiked}/>
                        </ButtonsWrapper>
                        <Button type="accent" style={{borderRadius: 100}} onClick={setCurrentTrack} W={150} H={30} fontS={1.4} fontW={600} content='Проиграть' />
                    </div>
                </>
            </TrackItemInfo>
        </div>
    )
}

export default ArtistTrackCard;