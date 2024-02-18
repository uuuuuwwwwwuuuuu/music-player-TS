import {FC} from 'react';
import './TrackItem.scss';
import { IoReorderTwo } from "react-icons/io5";
import { HiX } from "react-icons/hi";

type props = {
    id: string,
    albumImg: string,
    title: string,
    artists: string,
    additionalFunction: (id: string) => void;
    current?: boolean
}

const TrackItem: FC<props> = ({id, albumImg, title, artists, additionalFunction, current = false}) => {
    const createTrackCard = () => {
        return (
            <div className="track_card" onClick={() => additionalFunction(id)} key={id}>
                <img src={albumImg} alt="album" />
                <div className="track_card_info">
                    <span>{title}</span>
                    <span>{artists}</span>
                </div>
            </div>
        )
    }

    const buildCurrentTrackItem = () => {
        return (
            <div className='current_icons'>
                <IoReorderTwo />
                <HiX />
            </div>
        )
    }

    return (
        <div className='track_item'>
            {createTrackCard()}
            {current && buildCurrentTrackItem()}
        </div>
    )
}

export default TrackItem;