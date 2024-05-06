import { FC, useEffect, useState } from "react";

import './homeTrackCards.scss';
import { AddToPlayList, Like, PlayOrPause, PlayingTrackTag } from "../../icons and tags/icons";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { selectCurrentTrack, selectPlayList } from "../../../store/current/actionsCurrent";
import { ITrack } from "../../../store/likedPlayList/reducerLiked";

interface IProp {
    name: string,
    artists: string,
    img: string,
    id: string,
    playList: ITrack[]
}

export const HomeTrackCard: FC<IProp> = ({name, artists, img, id, playList}) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const currentTrackId = useAppSelector(state => state.current.trackId);

    const cutLongString = (string: string): string => {
        if (string.length > 17) {
            return string.substring(0, 15) + '...';
        }
        return string;
    }
;
    const playTrack = () => {
        dispatch(selectPlayList(playList));
        dispatch(selectCurrentTrack(id));
    };

    const audio = document.querySelector('audio');

    const imgHoverStyles: React.CSSProperties = {
        transform: currentTrackId === id ? 'scale(1.1)' : '',
        filter: currentTrackId === id ? 'blur(4px)' : ''
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
                <img style={imgHoverStyles} onClick={playTrack} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} src={img} alt="Фото трека" />
            </div>
            <div className="home_track_card_data">
                <div className="home_track_card_info">
                    <span>{cutLongString(name)}</span>
                    <span>{cutLongString(artists)}</span>
                </div>
                <div className="home_track_card_buttons">
                    <button><AddToPlayList /></button>
                    <button><Like /></button>
                </div>
            </div>
        </div>
    )
}