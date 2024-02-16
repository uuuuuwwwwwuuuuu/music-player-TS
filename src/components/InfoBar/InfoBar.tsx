import { ChangeEvent, FC, useEffect } from "react";
import './InfoBar.scss';
import { HiMusicalNote } from "react-icons/hi2";
import LikedPlayList from "../LikedPlayList/LikedPlayList";
import TrackListPreloader from "../TrackListPreloader/TrackListPreloader";
import { useAppDispatch, useAppSelector } from '../../hook';
import { loadLikedTrackList } from "../../store/likedPlayList/reducerLiked";
import { VscRunErrors } from "react-icons/vsc";
import { selectVisibleLikedTracks } from "../../store/likedPlayList/selectorsLikedPlayList";
import { searchLikedTrack } from "../../store/searchTrack/actionsSearchTrack";

const InfoBar: FC = () => {
    const selectedSearch = useAppSelector(state => state.search)
    const likedTrackList = useAppSelector(state => selectVisibleLikedTracks(state, selectedSearch));
    const {error, loading} = useAppSelector(state => state.liked)
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        likedTrackList.length === 0 && dispatch(loadLikedTrackList());
    }, []);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchLikedTrack(e.target.value));
    }

    return (
        <div className="info_bar">
            <div className="info_bar_title">
                <HiMusicalNote className="info_bar_icon"/>
                <span>Моя музыка</span>
            </div>
            <div className="btns_selection">
                <div className="info_bar_btn active_info_bar_btn">Любимое</div>
                <div className="info_bar_btn">Плейлисты</div>
                <div className="info_bar_btn">Артисты</div>
            </div>
            <input type="text" className="search_bar" placeholder="Поиск" onChange={handleInput}/>
            <div className="info_bar_container">
                <div className="liked_play_list_wrapper">
                    {error &&
                    <div className="error_block">
                        <span className="error_message">{error}</span>
                        <VscRunErrors className="error_icon"/>
                    </div>}
                    {loading && <TrackListPreloader />}
                    {likedTrackList 
                        ? <LikedPlayList likedTrackList={likedTrackList}/> 
                        : <h2>Вы не добавили ни одного трека</h2>}
                </div>
            </div>
        </div>
    )
}

export default InfoBar