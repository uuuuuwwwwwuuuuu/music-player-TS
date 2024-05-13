import { FC, useEffect, useState } from "react";

import './homeTrackCards.scss';
import { AddToPlayList, Like, PlayOrPause, PlayingTrackTag } from "../../icons and tags/icons";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { addToCurrentPlayList, selectCurrentTrack, selectPlayList } from "../../../store/current/actionsCurrent";
import { ITrack, toggleLike } from "../../../store/likedPlayList/reducerLiked";
import { addNotification } from "../../../store/notificationQueue/actionsNotification";
import { v4 as randomId } from 'uuid'
import { MdErrorOutline } from "react-icons/md";

interface IProp {
    track: ITrack,
    playList: ITrack[],
}

export const HomeTrackCard: FC<IProp> = ({track, playList}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const currentTrackId = useAppSelector(state => state.current.trackId);
    const {likedTrackList} = useAppSelector(state => state.liked)
    const {currentPlayList} = useAppSelector(state => state.current)
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const {id, title, albumImg, artists} = track;

    useEffect(() => {
        const likedTrack = likedTrackList.find(track => track.id === id)
        if (likedTrack) {
            setIsLiked(true);
        } else {
            setIsLiked(false)
        }
    }, [likedTrackList, id])

    const cutLongString = (string: string): string => {
        if (string.length > 17) {
            return string.substring(0, 15) + '...';
        }
        return string;
    }
    
    const playTrack = () => {
        dispatch(selectPlayList(playList));
        dispatch(selectCurrentTrack(id));
    };

    const imgHoverStyles: React.CSSProperties = {
        transform: currentTrackId === id ? 'scale(1.1)' : '',
        filter: currentTrackId === id ? 'blur(4px)' : ''
    }

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
        <div className="home_track_card">
            <div className="home_track_card_wrapper">
                <button onClick={playTrack} 
                style={{opacity: currentTrackId === id ? 1 : (isHovered ? 1 : 0)}} onMouseEnter={() => setIsHovered(true)} className="home_track_card_play">
                    {
                        currentTrackId === id 
                        ? <PlayingTrackTag />
                        : <PlayOrPause scale={30} className="home_track_card_play_icon" type="idle"/>
                    }
                </button>
                <img style={imgHoverStyles} onClick={playTrack} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} src={albumImg} alt="Фото трека" />
            </div>
            <div className="home_track_card_data">
                <div className="home_track_card_info">
                    <span>{cutLongString(title)}</span>
                    <span>{cutLongString(artists)}</span>
                </div>
                <div className="home_track_card_buttons">
                    <button onClick={addToPlayList}><AddToPlayList /></button>
                    <button onClick={toggleIsLiked}><Like type={isLiked ? 'active' : 'idle'}/></button>
                </div>
            </div>
        </div>
    )
}