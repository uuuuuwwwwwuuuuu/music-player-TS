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
import { toggleShowUserData } from "../../store/user/actionsUser";
import { showCurrentPlayListAction } from "../../store/current/actionsCurrent";
import AccountDataBar from "../../components/accountDataBar/accountDataBar";
import NotFoundPage from "../notFoundPage/notFoundPage";

const AppWrapper: FC = () => {
    const artists = useAppSelector(state => state.artists.artists);

    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const token: string | null = localStorage.getItem('Token');

    useEffect(() => {
        if (token) {
            dispatch(loadUserData());
            dispatch(loadArtists());
            dispatch(loadTrackList());
            dispatch(loadLikedTrackList());
            dispatch(loadLikedArtists());
        }
    }, [dispatch, token]);

    window.addEventListener('load', () => {
        navigate('/');
    })

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
                <Route path="*" element={<NotFoundPage/>} />
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
    errorHover: '#ab3939',
    successColor: '#4EBA3C',
    border: '#c5c4c652'
}

const App: FC<{token: string | null}> = ({token}) => {
    const location = useLocation();
    const {trackId} = useAppSelector(state => state.current);
    const dispatch = useAppDispatch();
    const {showUserData} = useAppSelector(state => state.user);
    const {showCurrentPlayList} = useAppSelector(state => state.current)

    useEffect(() => {
        if (location.pathname === '/home/fullscreen') {
            dispatch(toggleShowUserData(false));
        }

        if (showUserData && showCurrentPlayList) {
            dispatch(showCurrentPlayListAction(false));
        }
    }, [dispatch, location.pathname, showCurrentPlayList, showUserData]);

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
                {token && location.pathname !== '/home/fullscreen' && <AccountDataBar />}
            </ThemeProvider>
        </div>
    )
}

export default AppWrapper;

