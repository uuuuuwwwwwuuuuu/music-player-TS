import { FC } from "react";
import './NavPanel.scss';
import { IoHome } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

const NavPanel: FC = () => {
    return (
        <div className="nav_panel">
            <div className="nav_btn current_window">
                <IoHome  className="nav_icon" />
                <span>Домой</span>
            </div>
            <div className="nav_btn">
                <IoSearch className="nav_icon" />
                <span>Поиск</span>
            </div>
        </div>
    )
}

export default NavPanel;