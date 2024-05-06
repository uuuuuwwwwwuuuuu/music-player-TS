import {FC} from 'react';
import './LikedPlayList.scss';
import { ITrack } from '../../store/likedPlayList/reducerLiked';
import { selectCurrentTrack, selectPlayList } from '../../store/current/actionsCurrent';
import { useAppDispatch } from '../../hook';
import TrackItem from '../TrackItem/TrackItem';

type LikedPlayListProps = {
    likedTrackList: ITrack[]
}

const LikedPlayList: FC<LikedPlayListProps> = ({likedTrackList}) => {
    const dispatch = useAppDispatch();
    const selectLikedPlayList = (id: string) => {
        dispatch(selectPlayList(likedTrackList));
        dispatch(selectCurrentTrack(id));
    }

    return (
        <>
            {likedTrackList.map(item => {
                return (
                    <TrackItem id={item.id} albumImg={item.albumImg} title={item.title} artists={item.artists} additionalFunction={selectLikedPlayList} key={item.id} />
                )
            })}
        </>
    )
}

export default LikedPlayList;