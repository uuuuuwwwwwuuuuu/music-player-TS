import { ChangeEvent, FC, SyntheticEvent, useEffect } from "react";
import './InfoBar.scss';
import { HiMusicalNote } from "react-icons/hi2";
import LikedPlayList from "../LikedPlayList/LikedPlayList";
import TrackListPreloader from "../TrackListPreloader/TrackListPreloader";
import { useAppDispatch, useAppSelector } from '../../hook';
import { loadLikedTrackList } from "../../store/likedPlayList/reducerLiked";
import { VscRunErrors } from "react-icons/vsc";
import { selectVisibleLikedTracks } from "../../store/likedPlayList/selectorsLikedPlayList";
import { useRef } from "react";
import { LiaBell } from "react-icons/lia";


const InfoBar: FC = () => {
    const {likedTrackList, error: likedTrackListError, loading: likedTrackListLoading} = useAppSelector(state => state.liked);
    const userData = useAppSelector(state => state.user.data)
    
    const dispatch = useAppDispatch();

    const likedButton = useRef<HTMLButtonElement>(null);
    const artistButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (userData) {
            dispatch(loadLikedTrackList());
            // playlists.length === 0 && dispatch(loadPlayLists())
        }
    }, [dispatch, userData]);

    return (
        <div className="info_bar">
            <div className="info_bar_title">
                <HiMusicalNote className="info_bar_icon"/>
                <span>Моя музыка</span>
            </div>
            <div className="btns_selection">
                <button ref={likedButton} id="liked" className="info_bar_btn active_info_bar_btn">Любимое</button>
                <button ref={artistButton} id="artists" className="info_bar_btn">Артисты</button>
            </div>
            <div className="info_bar_container">
                <div className="info_bar_wrapper">
                    
                </div>
            </div>
        </div>
    )
}

export default InfoBar