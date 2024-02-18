import { FC } from "react";
import './AsideBar.scss';
import NavPanel from "../NavPanel/NavPanel";
import InfoBar from "../InfoBar/InfoBar";

type props = {
    showPlayList: boolean
}

const AsideBar:FC<props> = ({showPlayList}) => {

    const classList = showPlayList ? 'aside_bar blur' : 'aside_bar'

    return (
        <aside className={classList}>
            <NavPanel />
            <InfoBar />
        </aside>
    )
}

export default AsideBar;