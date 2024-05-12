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
import { Outlet, Route, Routes } from "react-router-dom";
import PreRegPage from "../preRegPage/PreRegPage";
import Artist from "../artist/artist";
import { ThemeProvider } from "styled-components";
import ITheme from "../../styled";

const AppWrapper: FC = () => {
    const {showCurrentPlayList: showPlayList, currentPlayList} = useAppSelector(state => state.current);
    const showUserData = useAppSelector(state => state.user);
    // Потом нужно будет удалить !!!!!!!!!!!!!!!!!!
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
            <Route path="/" element={<App token={token} toggleIsFullScreen={toggleIsFullScreen}/>}>
                <Route index element={<PreRegPage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/home" element={<Main />} />
                {/* <Route path={'artist/' + artist.name} element={artist && <Artist artistName={artist.name} />} /> */}
            </Route>
        </Routes>
    );
};

interface IAppProp {
    toggleIsFullScreen: (isFullScreen: boolean) => void,
    token: string | null
}

const baseTheme: ITheme = {
    accent: '#5E37CC',
    accentHover: '#4927a8',
    text: '#E0DCEA',
    textSecond: '#C5C4C6',
    textDisable: '#919095',
    mainBg: '#1B1A1C',
    mainBgBlur: '#2b2a2d53',
    secondBg: '#141414',
    secondBgBlur: '#141414b8',
    inputsBg: '#2B2A2D',
    disabledBg: '#232224',
    errorColor: '#C84141',
    successColor: '#4EBA3C',
}

const App: FC<IAppProp> = ({toggleIsFullScreen, token}) => {
    return (
        <div className="App">
            <ThemeProvider theme={baseTheme} >
                <div className="app_wrapper">
                    <Outlet />
                </div>
                {token && <PlaySelection toggleIsFullScreen={toggleIsFullScreen}/>}
                {token && <Notification />}
            </ThemeProvider>
        </div>
    )
}

export default AppWrapper;