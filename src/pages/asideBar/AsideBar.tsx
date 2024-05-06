import { FC, useEffect, useState } from "react";
import './AsideBar.scss';
import NavPanel from "../NavPanel/NavPanel";
import InfoBar from "../InfoBar/InfoBar";

type props = {
    showPlayList: boolean,
    isFullScreen: boolean
}

const AsideBar:FC<props> = ({showPlayList, isFullScreen}) => {
    const [classList, setClassList] = useState('aside_bar')
    useEffect(() => {
        if (showPlayList || isFullScreen) {
            setClassList('aside_bar blur');
        } else {
            setClassList('aside_bar');
        }
    }, [isFullScreen, showPlayList]);
    
    return (
        <aside style={{position: 'absolute', opacity: 0}} className={classList}>
            <NavPanel />
            <InfoBar />
        </aside>
    )
}

export default AsideBar;