import { FC, useEffect, useState } from "react";
import "./App.scss";
import AsideBar from "../asideBar/AsideBar";
import Main from "../Main/Main";
import PlaySelection from "../PlaySelection/PlaySelection";
import CurrentPlayList from "../currentPlayList/CurrentPlayList";
import { useAppSelector } from "../../hook";


const App: FC = () => {
    const showPlayList = useAppSelector(state => state.current.showCurrentPlayList);

    return (
        <div className="App">
            <div className="app_wrapper">
                <AsideBar showPlayList={showPlayList}/>
                <Main showPlayList={showPlayList}/>
                <CurrentPlayList showPlayList={showPlayList}/>
            </div>
            <PlaySelection />
        </div>
    );
};

export default App;