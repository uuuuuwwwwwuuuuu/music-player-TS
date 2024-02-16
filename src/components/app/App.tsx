import { FC } from "react";
import "./App.scss";
import AsideBar from "../asideBar/AsideBar";
import Main from "../Main/Main";
import PlaySelection from "../PlaySelection/PlaySelection";


const App: FC = () => {

    return (
        <div className="App">
            <div className="app_wrapper">
                <AsideBar />
                <Main />
            </div>
            <PlaySelection />
        </div>
    );
};

export default App;