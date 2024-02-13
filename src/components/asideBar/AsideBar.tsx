import { FC } from "react";
import './AsideBar.scss';
import NavPanel from "../NavPanel/NavPanel";
import InfoBar from "../InfoBar/InfoBar";

const AsideBar:FC = () => {
    return (
        <aside className="aside_bar">
            <NavPanel />
            <InfoBar />
        </aside>
    )
}

export default AsideBar;