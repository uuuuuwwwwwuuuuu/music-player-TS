import { FC, useEffect } from "react";
import "./App.scss";
import Main from "../Main/Main";
import PlaySelection from "../PlaySelection/PlaySelection";
import { useAppDispatch, useAppSelector } from "../../hook";
import Auth from "../auth/auth";
import { loadUserData } from "../../store/user/reducerUser";
import { loadArtists } from "../../store/artists/reducerArtists";
import { loadTrackList } from "../../store/tracks/reducerTrackList";
import Notification from "../../components/notification/notification";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import PreRegPage from "../preRegPage/PreRegPage";
import Artist from "../artist/artist";
import { ThemeProvider } from "styled-components";
import ITheme from "../../styled";
import Headers from "../../components/headers/headers";
import AuthAfterReg from "../authAfterReg/authAfterReg";
import PreRegErrorPage from "../preRegErrorPage/preRegErrorPage";
import { loadLikedTrackList } from "../../store/likedPlayList/reducerLiked";

const AppWrapper: FC = () => {
    const showUserData = useAppSelector(state => state.user);
    const artists = useAppSelector(state => state.artists.artists);
    const dispatch = useAppDispatch();

    const token: string | null = localStorage.getItem('Token');

    useEffect(() => {
        if (!showUserData.data && !showUserData.error && token) {
            dispatch(loadUserData());
        }
    }, [dispatch, showUserData.data, showUserData.error, token]);

    useEffect(() => {
        dispatch(loadArtists());
        dispatch(loadTrackList());
        dispatch(loadLikedTrackList());
    }, [dispatch, token]);

    return (
        <Routes>
            <Route path="/" element={<App token={token}/>}>
                <Route index element={token ? <AuthAfterReg/> : <PreRegPage />} />
                <Route path="/auth" element={token ? <AuthAfterReg /> : <Auth />} />
                <Route path="/home" element={token ? <Main /> : <PreRegErrorPage />} />
                {artists.map(artist => {
                    return <Route key={artist.id} path={'/artist/' + artist.name} element={<Artist artistName={artist.name}/>}/>
                })}
                <Route path="*" element={<div>hyi</div>} />
            </Route>
        </Routes>
    );
};

interface IAppProp {
    token: string | null
}

const App: FC<IAppProp> = ({token}) => {
    const location = useLocation();
    const {trackId} = useAppSelector(state => state.current)
    return (
        <div className="App">
            <ThemeProvider theme={baseTheme} >
                <div className="app_wrapper" style={{paddingBottom: trackId ? 50 : 0}}>
                    {location.pathname !== '/auth' && (token ? <Headers type="main" /> : <Headers type="simple" />)}
                    <Outlet />
                </div>
                {token && <PlaySelection/>}
                {token && <Notification />}
            </ThemeProvider>
        </div>
    )
}

export default AppWrapper;

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