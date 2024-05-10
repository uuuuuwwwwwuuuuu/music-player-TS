import { FC, useEffect, useState } from "react";
import "./App.scss";
import Main from "../Main/Main";
import PlaySelection from "../PlaySelection/PlaySelection";
import { useAppDispatch, useAppSelector } from "../../hook";
import Auth from "../auth/auth";
import { loadUserData } from "../../store/user/reducerUser";
import { loadArtists } from "../../store/artists/reducerArtists";
import { loadTrackList } from "../../store/tracks/reducerTrackList";
import Notification from "../../components/notification/notification";
import { Route, Routes } from "react-router-dom";
import PreRegPage from "../preRegPage/PreRegPage";
import Artist from "../artist/artist";

const AppWrapper: FC = () => {
    const {showCurrentPlayList: showPlayList, currentPlayList} = useAppSelector(state => state.current);
    const showUserData = useAppSelector(state => state.user);
    // Потом нужно будет удалить !!!!!!!!!!!!!!!!!!
    const artist = useAppSelector(state => state.artists.artists[3])
    
    const dispatch = useAppDispatch();

    const [isFullScreen, setIsFullScreen] = useState(false);

    const token: string | null = localStorage.getItem('Token');
    // Подгрузка данных пользователя после авторизации
    useEffect(() => {
        if (!showUserData.data && !showUserData.error && token) {
            dispatch(loadUserData());
        }
    }, [dispatch, showUserData.data, showUserData.error, token]);

    // Подгрузка остальных данных после авторизации
    useEffect(() => {
        dispatch(loadArtists());
        dispatch(loadTrackList());
    }, [dispatch, token]);

    const toggleIsFullScreen = (isFullScreen: boolean) => {
        setIsFullScreen(isFullScreen);
    }
    return (
        <Routes>
            <Route path="/" element={<PreRegPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<App token={token} toggleIsFullScreen={toggleIsFullScreen}/>} />
            <Route path="/artist" element={artist && <Artist big_img={artist.big_img} name={artist.name} likes={artist.likes} tracks={artist.tracks} />} />
        </Routes>
    );
};

interface IAppProp {
    toggleIsFullScreen: (isFullScreen: boolean) => void,
    token: string | null
}

const App: FC<IAppProp> = ({toggleIsFullScreen, token}) => {
    return (
        <div className="App">
            <div className="app_wrapper">
                <Main />
            </div>
            {token && <PlaySelection toggleIsFullScreen={toggleIsFullScreen}/>}
            {token && <Notification />}
        </div>
    )
}

export default AppWrapper;