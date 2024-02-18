import { FC, ReactElement } from "react";
import './Main.scss';
import Settings from "./Settings/Settings";
import Home from "./Home/Home";
import Search from "./Search/Search";
import User from "./User/User";
import { useAppSelector } from "../../hook";
import { NavSelections } from "../../store/navigation/actionsNavigation";

type props = {
    showPlayList: boolean
}

const Main: FC<props> = ({showPlayList}) => {
    const navBlock = useAppSelector(state => state.nav);

    const classList = showPlayList ? 'main blur' : 'main';

    let content: ReactElement = <Home />;

    switch(navBlock) {
        case NavSelections.HOME:
            content = <Home />;
            break;
        case NavSelections.SEARCH:
            content = <Search />;
            break;
        case NavSelections.SETTINGS:
            content = <Settings />;
            break;
        case NavSelections.USER:
            content = <User />
            break
    }

    return (
        <div className={classList}>
            {content}
        </div>
    );
}

export default Main;