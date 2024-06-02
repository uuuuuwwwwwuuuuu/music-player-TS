import { FC } from "react";

import './headers.scss';
import Button from "../buttons/buttons";
import { IoIosSearch } from "react-icons/io";
import { Input } from "../inputFields/inputFields";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiHome } from "react-icons/hi2";

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
`

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

    const goHome = () => {
        navigate('/home');
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