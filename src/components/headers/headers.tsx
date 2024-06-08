import { FC } from "react";

import './headers.scss';
import Button from "../buttons/buttons";
import { IoIosSearch } from "react-icons/io";
import { Input } from "../inputFields/inputFields";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiHome } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../hook";
import { toggleShowUserData } from "../../store/user/actionsUser";
import { UserIcon } from "../icons and tags/icons";

interface IHeadersProp {
    type: 'simple' | 'main',
    className?: string,
    style?: React.CSSProperties
}

const GoHomeBtn = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 100px;
    background-color: ${({theme}) => theme.inputsBg};
    cursor: pointer;

    svg {
        position: relative;
        top: 1px;
        color: ${({theme}) => theme.textDisable};
    }

    @media (hover: hover) {
        &:hover {
            svg {
                color: ${({theme}) => theme.text};
            }
            transform: scale(1.02);
        }
    }
`;

const Headers: FC<IHeadersProp> = ({type, className, style}) => {
    const navigate = useNavigate();
    const location = useLocation()
    const dispatch = useAppDispatch();
    
    const {username, email, user_img} = useAppSelector(state => state.user.data);
    const {showUserData} = useAppSelector(state => state.user);

    const goBack = () => {
        navigate(-1);
        if (location.pathname === '/' || location.pathname === '/auth') {
            navigate(1);
        }
    }

    const goForward = () => {
        navigate(1);
    }

    const goHome = () => {
        navigate('/home');
    }

    const toggleSUD = () => {
        dispatch(toggleShowUserData(true));
    }

    if (type === 'main') {
        return (
            <header style={style} className={"main_header " + className}>
                <nav>
                    <Button 
                        type="alternative"
                        H={40} W={40}
                        content='<'
                        fontS={3.2}
                        fontW={400}
                        onClick={goBack}/>
                    <Button 
                        type="alternative"
                        H={40} W={40}
                        content='>'
                        fontS={3.2}
                        fontW={400}
                        onClick={goForward}/>
                    <GoHomeBtn onClick={goHome}>
                        <HiHome />
                    </GoHomeBtn>
                </nav>
                <div style={{opacity: showUserData ? 0 : 1}} className="header_account" onClick={toggleSUD}>
                    <div className="header_account_info">
                        <span>{username}</span>
                        <span>{email}</span>
                    </div>
                    <div className="account_photo">
                        {user_img ? <img src={user_img} alt="моё фото" /> : <UserIcon />}
                    </div>
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