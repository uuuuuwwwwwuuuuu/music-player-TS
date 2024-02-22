import { FC, useState } from "react";
import "./App.scss";
import AsideBar from "../asideBar/AsideBar";
import Main from "../Main/Main";
import PlaySelection from "../PlaySelection/PlaySelection";
import CurrentPlayList from "../currentPlayList/CurrentPlayList";
import { useAppSelector } from "../../hook";


const App: FC = () => {
    const showPlayList = useAppSelector(state => state.current.showCurrentPlayList);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleIsFullScreen = (isFullScreen: boolean) => {
        setIsFullScreen(isFullScreen);
    }

    return (
        <div className="App">
            <div className="app_wrapper">
                <AsideBar isFullScreen={isFullScreen} showPlayList={showPlayList}/>
                <Main isFullScreen={isFullScreen} showPlayList={showPlayList}/>
                <CurrentPlayList isFullScreen={isFullScreen} showPlayList={showPlayList}/>
            </div>
            <PlaySelection toggleIsFullScreen={toggleIsFullScreen}/>
        </div>
    );
};

export default App;