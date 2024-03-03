import { ChangeEvent, FC, SyntheticEvent, useEffect } from "react";
import './InfoBar.scss';
import { HiMusicalNote } from "react-icons/hi2";
import LikedPlayList from "../LikedPlayList/LikedPlayList";
import TrackListPreloader from "../TrackListPreloader/TrackListPreloader";
import { useAppDispatch, useAppSelector } from '../../hook';
import { loadLikedTrackList } from "../../store/likedPlayList/reducerLiked";
import { VscRunErrors } from "react-icons/vsc";
import { selectVisibleLikedTracks } from "../../store/likedPlayList/selectorsLikedPlayList";
import { searchLikedTrack, toggleIsFocus } from "../../store/searchTrack/actionsSearchTrack";
import { selectSelection } from "../../store/selections/actionsSelections";
import { useRef } from "react";

const InfoBar: FC = () => {
    const selectedSearch = useAppSelector(state => state.search.search)
    const likedTrackList = useAppSelector(state => selectVisibleLikedTracks(state, selectedSearch));
    const currentSelection = useAppSelector(state => state.selection);
    const {error, loading} = useAppSelector(state => state.liked);
    
    const dispatch = useAppDispatch();

    const likedButton = useRef<HTMLButtonElement>(null);
    const playlistButton = useRef<HTMLButtonElement>(null);
    const artistButton = useRef<HTMLButtonElement>(null);
    const buttonsArray = [likedButton.current, playlistButton.current, artistButton.current]

    useEffect(() => {
        likedTrackList.length === 0 && dispatch(loadLikedTrackList());
    }, []);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(searchLikedTrack(e.target.value));
    }

    const changeSelection = (event: SyntheticEvent<HTMLButtonElement>) => {
        dispatch(selectSelection(event.currentTarget.id));
    }

    const onInputFocus = () => {
        dispatch(toggleIsFocus(true));
    }

    const onInputBlur = () => {
        dispatch(toggleIsFocus(false));
    }

    useEffect(() => {
        buttonsArray.forEach(item => {
            if (item?.id === currentSelection) {
                if (!item.classList.contains('active_info_bar_btn')) {
                    item.classList.add('active_info_bar_btn');
                }
            } else {
                if (item?.classList.contains('active_info_bar_btn')) {
                    item.classList.remove('active_info_bar_btn');
                }
            }
        });
    }, [currentSelection]);

    return (
        <div className="info_bar">
            <div className="info_bar_title">
                <HiMusicalNote className="info_bar_icon"/>
                <span>Моя музыка</span>
            </div>
            <div className="btns_selection">
                <button onClick={changeSelection} ref={likedButton} id="liked" className="info_bar_btn active_info_bar_btn">Любимое</button>
                <button onClick={changeSelection} ref={playlistButton} id="playlists" className="info_bar_btn">Плейлисты</button>
                <button onClick={changeSelection} ref={artistButton} id="artists" className="info_bar_btn">Артисты</button>
            </div>
            <input onFocus={onInputFocus} onBlur={onInputBlur} type="text" className="search_bar" placeholder="Поиск" onChange={handleInput}/>
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