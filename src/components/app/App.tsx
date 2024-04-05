import { FC, useEffect, useState } from "react";
import "./App.scss";
import AsideBar from "../asideBar/AsideBar";
import Main from "../Main/Main";
import PlaySelection from "../PlaySelection/PlaySelection";
import CurrentPlayList from "../currentPlayList/CurrentPlayList";
import { useAppDispatch, useAppSelector } from "../../hook";
import Auth from "../auth/auth";
import { loadUserData } from "../../store/user/reducerUser";


const App: FC = () => {
    const showPlayList = useAppSelector(state => state.current.showCurrentPlayList);
    const dispatch = useAppDispatch();
    const showUserData = useAppSelector(state => state.userReducer)
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        if (!showUserData.data && !showUserData.error) {
            dispatch(loadUserData());
        }
    }, [dispatch, showUserData.data, showUserData.error]);

    const toggleIsFullScreen = (isFullScreen: boolean) => {
        setIsFullScreen(isFullScreen);
    }

    const renderContent = () => {
        const token: string | null= localStorage.getItem('Token')
        if (!token) {
            return <Auth/>
        } else {
            return (
                <div className="App">
                    <div className="app_wrapper">
                        <AsideBar isFullScreen={isFullScreen} showPlayList={showPlayList}/>
                        <Main isFullScreen={isFullScreen} showPlayList={showPlayList}/>
                        <CurrentPlayList isFullScreen={isFullScreen} showPlayList={showPlayList}/>
                    </div>
                    <PlaySelection toggleIsFullScreen={toggleIsFullScreen}/>
                </div>
            )
        }
    }

    return renderContent();
};

export default App;