import { FC } from "react";
import './InfoBar.scss';
import { HiMusicalNote } from "react-icons/hi2";

const InfoBar: FC = () => {
    return (
        <div className="info_bar">
            <div className="info_bar_container">
                <div className="info_bar_title">
                    <HiMusicalNote className="info_bar_icon"/>
                    <span>Моя музыка</span>
                </div>
            </div>
            <div className="btns_selection">
                <div className="info_bar_btn active_info_bar_btn">Любимое</div>
                <div className="info_bar_btn">Плейлисты</div>
                <div className="info_bar_btn">Артисты</div>
            </div>
        </div>
    )
}

export default InfoBar