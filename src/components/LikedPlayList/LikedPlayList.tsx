import {FC} from 'react';
import './LikedPlayList.scss';
import { ITrack } from '../../store/likedPlayList/reducerLiked';
import { selectPlayList } from '../../store/currentPlayList/actionsCurrentPlayList';
import { useAppDispatch } from '../../hook';

type LikedPlayListProps = {
    likedTrackList: ITrack[]
}

const LikedPlayList: FC<LikedPlayListProps> = ({likedTrackList}) => {
    const dispatch = useAppDispatch();
    const selectLikedPlayList = (id: string) => {
        dispatch(selectPlayList(likedTrackList, id));
    }

    return (
        <>
            {likedTrackList.map(item => {
                return (
                    <div className="track_card" onClick={() => selectLikedPlayList(item.id)} key={item.id}>
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