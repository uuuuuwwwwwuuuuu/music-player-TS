import { FC } from "react";
import './NavPanel.scss';
import { IoHome } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../hook";
import { selectNavBlock, NavSelections } from "../../store/navigation/actionsNavigation";
import { FaUser } from "react-icons/fa";

const NavPanel: FC = () => {
    const dispatch = useAppDispatch();
    const selectedBlock = useAppSelector(state => state.nav);

    let classList = {
        home: 'nav_btn',
        search: 'nav_btn',
        settings: 'nav_btn',
        user: 'nav_btn'
    }

    switch(selectedBlock) {
        case NavSelections.HOME:
            classList.home = 'nav_btn current_window'
            break
        case NavSelections.SEARCH:
            classList.search = 'nav_btn current_window'
            break
        case NavSelections.USER:
            classList.user = 'nav_btn current_window'
            break
        case NavSelections.SETTINGS:
            classList.settings = 'nav_btn current_window'
            break
    }

    const handleHome = () => {
        dispatch(selectNavBlock(NavSelections.HOME));
    }

    const handleSearch = () => {
        dispatch(selectNavBlock(NavSelections.SEARCH));
    }

    const handleSettings = () => {
        dispatch(selectNavBlock(NavSelections.SETTINGS));
    }

    const handleUser = () => {
        dispatch(selectNavBlock(NavSelections.USER));
    }

    return (
        <div className="nav_panel">
            <div className="nav_wrapper">
                <div onClick={handleHome} className={classList.home}>
                    <IoHome  className="nav_icon" />
                    <span>Домой</span>
                </div>
                <div onClick={handleSearch} className={classList.search}>
                    <IoSearch className="nav_icon" />
                    <span>Поиск</span>
                </div>
            </div>
            <div className="nav_wrapper">
                <div onClick={handleSettings} className={classList.settings}>
                    <IoSettings className="nav_icon" />
                    <span>Настройки</span>
                </div>
                <div onClick={handleUser} className={classList.user}>
                    <FaUser className="nav_icon"/>
                    <span>Аккаунт</span>
                </div>
            </div>
        </div>
    )
}

export default NavPanel;