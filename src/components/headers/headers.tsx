import { FC } from "react";

import './headers.scss';
import Button from "../buttons/buttons";
import { IoIosSearch } from "react-icons/io";
import { Input } from "../inputFields/inputFields";
import { useLocation, useNavigate } from "react-router-dom";

interface IHeadersProp {
    type: 'simple' | 'main',
    className?: string,
    style?: React.CSSProperties
}

const Headers: FC<IHeadersProp> = ({type, className, style}) => {
    const navigate = useNavigate();
    const location = useLocation()

    const goBack = () => {
        navigate(-1);
        if (location.pathname === '/' || location.pathname === '/auth') {
            navigate(1);
        }
    }

    const goForward = () => {
        navigate(1);
    }

    if (type === 'main') {
        return (
            <header style={style} className={"main_header " + className}>
                <div className="nav_buttons">
                    <Button 
                        type="alternative"
                        H={40} W={40}
                        content='<'
                        fontS={3.2}
                        fontW={400}
                        style={{marginRight: 10}}
                        onClick={goBack}/>
                    <Button 
                        type="alternative"
                        H={40} W={40}
                        content='>'
                        fontS={3.2}
                        fontW={400}
                        onClick={goForward}/>
                </div>
                <div className="header_search_panel">
                    <button>
                        <IoIosSearch />
                    </button>
                    <Input 
                        H={40} W={400} fontS={1.5} fontW={400}
                        type="text" placeholder="Поиск"
                        style={{paddingLeft: 50}}/>
                </div>
                <div className="header_info">
                    <div className="header_account">
                        <div className="header_account_info">
                            <span>Devor</span>
                            <span>Пользователь</span>
                        </div>
                        <div className="account_photo">
                            <img src="/img/my_photo.jpeg" alt="моё фото" />
                        </div>
                    </div>
                    <Button type="accent" W={200} H={40} content='Обновить план' fontS={1.8} fontW={600} />
                </div>
            </header>
        )
    } else {
        return (
            <header style={style} className={"simple_header " + className}>
                <span>BROOKLYN</span>
            </header>
        )
    }
}

export default Headers;