import {FC} from 'react';
import './TrackItem.scss';
import { IoReorderTwo } from "react-icons/io5";
import { HiX } from "react-icons/hi";
import { useAppDispatch } from '../../hook';
import { deleteCurrentTrack } from '../../store/current/actionsCurrent';

type props = {
    id: string,
    albumImg: string,
    title: string,
    artists: string,
    additionalFunction: (id: string) => void;
    current?: boolean | undefined
}

const TrackItem: FC<props> = ({id, albumImg, title, artists, additionalFunction, current = false}) => {
    const dispatch = useAppDispatch();


    const deleteCurrent = () => {
        dispatch(deleteCurrentTrack(id));
    }

    const createTrackCard = () => {
        return (
            <div className="track_card" onClick={() => additionalFunction(id)} >
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
                <button>
                    <IoReorderTwo />
                </button>
                <button onClick={deleteCurrent}>
                    <HiX />
                </button>
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