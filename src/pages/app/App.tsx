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
import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PreRegPage from "../preRegPage/PreRegPage";
import Artist from "../artist/artist";
import { ThemeProvider } from "styled-components";
import ITheme from "../../styled";
import Headers from "../../components/headers/headers";
import AuthAfterReg from "../authAfterReg/authAfterReg";
import PreRegErrorPage from "../preRegErrorPage/preRegErrorPage";
import { loadLikedTrackList } from "../../store/likedPlayList/reducerLiked";
import AsideBar from "../../components/asideBar/asideBar";
import { loadLikedArtists } from "../../store/likedArtists/reducerLikedArtists";
import FullScreen from "../fullScreen/fullScreen";
import AudioModule from "../audioModule/audioModule";
import CPLSelection from "../../components/CPLSelection/CPLSelection";
import LikedPage from "../likedPage/likedPage";

const AppWrapper: FC = () => {
    const showUserData = useAppSelector(state => state.user);
    const artists = useAppSelector(state => state.artists.artists);
    const {trackList} = useAppSelector(state => state.trackList);

    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

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
        dispatch(loadLikedArtists());
    }, [dispatch, token]);

    useEffect(() => {
        if (location.pathname === '/' && token) {
            navigate('/home');
        }
    }, [location, token, navigate]);

    return (
        <Routes>
            <Route path="/" element={<App token={token}/>}>
                <Route index element={token ? <AuthAfterReg/> : <PreRegPage />} />
                <Route path="/auth" element={token ? <AuthAfterReg /> : <Auth />} />
                <Route path="/home" element={token ? <Main /> : <PreRegErrorPage />} />
                {artists.map(artist => {
                    return <Route key={artist.id} path={'/artist/' + artist.name} element={<Artist artistName={artist.name}/>}/>
                })}
                <Route path="/home/fullscreen" element={<FullScreen />} />
                <Route path='/home/liked' element={<LikedPage />} />
                <Route path="*" element={<div>hyi</div>} />
            </Route>
        </Routes>
    );
};

export const baseTheme: ITheme = {
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
    border: '#c5c4c652'
}

const App: FC<{token: string | null}> = ({token}) => {
    const location = useLocation();
    const {trackId} = useAppSelector(state => state.current)
    return (
        <div className="App">
            <ThemeProvider theme={baseTheme} >
                <div className="app_wrapper" style={{paddingBottom: trackId ? 50 : 0}}>
                    {(location.pathname !== '/auth' && location.pathname !== '/home/fullscreen')
                        && (token ? <Headers type="main" /> : <Headers type="simple" />)}
                    <Outlet />
                </div>
                {location.pathname !== '/home/fullscreen' && token && <PlaySelection/>}
                {token && <Notification />}
                {location.pathname !== '/home/fullscreen' && token && <AsideBar />}
                {token && <AudioModule />}
                {token && location.pathname !== '/home/fullscreen' && <CPLSelection />}
            </ThemeProvider>
        </div>
    )
}

export default AppWrapper;

