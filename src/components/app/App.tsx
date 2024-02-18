import { FC } from "react";
import "./App.scss";
import AsideBar from "../asideBar/AsideBar";
import Main from "../Main/Main";
import PlaySelection from "../PlaySelection/PlaySelection";
import CurrentPlayList from "../currentPlayList/CurrentPlayList";


const App: FC = () => {

    return (
        <div className="App">
            <div className="app_wrapper">
                <AsideBar />
                <Main />
                <CurrentPlayList />
            </div>
            <PlaySelection />
        </div>
    );
};

export default App;