import { FC, useEffect, useState } from "react";
import "./App.scss";
import AsideBar from "../asideBar/AsideBar";
import Main from "../Main/Main";
import PlaySelection from "../PlaySelection/PlaySelection";
import CurrentPlayList from "../currentPlayList/CurrentPlayList";
import { useAppDispatch, useAppSelector } from "../../hook";
import Auth from "../auth/auth";
import { loadUserData } from "../../store/user/reducerUser";
import { loadArtists } from "../../store/artists/reducerArtists";
import { loadTrackList } from "../../store/tracks/reducerTrackList";

const App: FC = () => {
    const {showCurrentPlayList: showPlayList, currentPlayList} = useAppSelector(state => state.current);
    const showUserData = useAppSelector(state => state.user);
    
    const dispatch = useAppDispatch();
    
    const [isFullScreen, setIsFullScreen] = useState(false);
    
    const token: string | null = localStorage.getItem('Token');

    useEffect(() => {
        if (!showUserData.data && !showUserData.error && token) {
            dispatch(loadUserData());
        }
    }, [dispatch, showUserData.data, showUserData.error, token]);

    useEffect(() => {
        dispatch(loadArtists());
        dispatch(loadTrackList());
    }, [])

    const toggleIsFullScreen = (isFullScreen: boolean) => {
        setIsFullScreen(isFullScreen);
    }

    const renderContent = () => {
        if (!token) {
            return <Auth/>
        } else {
            return (
                <div className="App">
                    <div className="app_wrapper">
                        {/* <AsideBar isFullScreen={isFullScreen} showPlayList={showPlayList}/> */}
                        <Main />
                        {/* {currentPlayList && <CurrentPlayList isFullScreen={isFullScreen} showPlayList={showPlayList}/>} */}
                    </div>
                    <PlaySelection toggleIsFullScreen={toggleIsFullScreen}/>
                </div>
            )
        }
    }

    return renderContent();
};

export default App;