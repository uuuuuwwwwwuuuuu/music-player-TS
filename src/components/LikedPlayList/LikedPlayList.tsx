import {FC} from 'react';
import './LikedPlayList.scss';
import { ITrack } from '../../store/likedPlayList/reducerLiked';

type LikedPlayListProps = {
    likedTrackList: ITrack[]
}

const LikedPlayList: FC<LikedPlayListProps> = ({likedTrackList}) => {

    return (
        <>
            {likedTrackList.map(item => {
                return (
                    <div className="track_card" key={item.id}>
                        <img src={item.albumImg} alt="album" />
                        <div className="track_card_info">
                            <span>{item.title}</span>
                            <span>{item.artists}</span>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default LikedPlayList;