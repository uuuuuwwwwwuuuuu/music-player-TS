import { FC, useEffect, useRef } from 'react';
import './icons.scss';

import { TiHeartFullOutline } from "react-icons/ti";
import { FaPause, FaPlay, FaRandom, FaUser } from 'react-icons/fa';
import { BsFillRewindFill } from 'react-icons/bs';
import { LuRepeat, LuRepeat1 } from 'react-icons/lu';
import { PiPlaylistBold } from "react-icons/pi";
import { TbPlaylistAdd } from "react-icons/tb";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { BsArrowsAngleContract } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import styled, { keyframes } from 'styled-components';
import { RxCross2 } from 'react-icons/rx';
import { FaUserCheck } from "react-icons/fa";

interface IProps {
    scale?: number,
    type?: 'active' | 'idle' | 'disable',
    className?: string,
    style?: React.CSSProperties
}

const getClassList = (type: 'active' | 'idle' | 'disable', className: string | undefined): string => {
    let classList: string = ``

    if (type === 'active') {
        classList += 'active_icon';
    } else if (type === 'disable') {
        classList += 'disable_icon';
    } else {
        classList += 'idle_icon';
    }
    if (className) {
        return `${classList} ${className}`
    } else {
        return classList
    }
}

export const Like: FC<IProps> = ({scale = 20, type = 'idle', className, style}) => {
    switch (type) {
        case 'idle':
            return <TiHeartFullOutline className={getClassList(type, className) + ' like_icon'}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/> 
        case 'active':
            return <TiHeartFullOutline className={getClassList(type, className)}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/> 
        case 'disable':
            return <TiHeartFullOutline className={getClassList(type, className)  + ' like_icon'}
            style={{width: `${scale}px`, height: `${scale}px`, ...style}}/> 
    }
}

export const Random: FC<IProps> = ({scale = 20, type = 'idle', className, style}) => {
    return <FaRandom className={getClassList(type, className)}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
}

export const Rewind: FC<IProps> = ({scale = 20, type = 'idle', className, style}) => {
    return <BsFillRewindFill className={getClassList(type, className)}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
}

export const Repeat: FC<IProps> = ({scale = 20, type = 'idle', className, style}) => {
    const propClass = className ? className : ''
    if (type === 'idle') {
        return <LuRepeat className={'idle_icon ' + propClass}
        style={{width: `${scale}px`, height: `${scale}px`, strokeWidth: 2.5, ...style}}/>
    } else if (type === 'active') {
        return <LuRepeat1 className={'active_icon ' + propClass}
        style={{width: `${scale}px`, height: `${scale}px`, strokeWidth: 2.5, ...style}}/>
    } else {
        return <LuRepeat className={'disable_icon ' + propClass}
        style={{width: `${scale}px`, height: `${scale}px`, strokeWidth: 2.5, ...style}}/>
    }
}

export const PlayOrPause: FC<IProps> = ({scale = 20, type = 'idle', className, style}) => {
    const propClass = className ? className : ''
    if (type === 'active') {
        return <FaPause className={'idle_icon ' + propClass}
        style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
    } else if (type === 'idle') {
        return <FaPlay className={'active_icon ' + propClass}
        style={{width: `${scale - 2}px`, height: `${scale - 2}px`, ...style}} />
    } else {
        return <FaPlay className={'disable_icon ' + propClass}
        style={{width: `${scale - 2}px`, height: `${scale - 2}px`, ...style}} />
    }
}

export const CurrentPlayList: FC<IProps> = ({scale = 20, type = 'idle', className, style}) => {
    return <PiPlaylistBold className={getClassList(type, className)}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
}

export const AddToPlayList: FC<IProps> = ({scale = 20, type = 'idle', className, style}) => {
    return <TbPlaylistAdd className={getClassList(type, className) + ' add_playlist'}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
}

export const FullScreen: FC<IProps> = ({scale = 20, type = 'idle', className, style}) => {
    if (type === 'idle') {
        return <BsArrowsAngleExpand strokeWidth={1.5} className={getClassList(type, className)}
                    style={{width: `calc(${scale}px - 35%)`, height: `calc(${scale}px - 35%)`, ...style}}/>
    } else if (type === 'active') {
        return <BsArrowsAngleContract strokeWidth={1.5} className={getClassList(type, className)}
        style={{width: `calc(${scale}px - 35%)`, height: `calc(${scale}px - 35%)`, ...style}}/>
    } else {
        return <BsArrowsAngleExpand strokeWidth={1.5} className={getClassList(type, className)}
        style={{width: `calc(${scale}px - 35%)`, height: `calc(${scale}px - 35%)`, ...style}}/>
    }
}
export const Follow: FC<IProps> =({scale = 20, type = 'idle', className, style}) => {
    return <FaUserPlus className={getClassList(type, className) + ' add_playlist'}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
}

export const Cross: FC<IProps> =({scale = 20, type = 'idle', className, style}) => {
    return <RxCross2 className={getClassList(type, className)}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}} strokeWidth={0.5}/>
}

export const UnFollow: FC<IProps> =({scale = 20, type = 'idle', className, style}) => {
    return <FaUserCheck className={getClassList(type, className) + ' add_playlist'}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
}

export const UserIcon: FC<IProps> =({scale = 20, type = 'idle', className, style}) => {
    return <FaUser className={getClassList(type, className) + ' add_playlist'}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
}


const TagAnimation = (height: number) => keyframes`
    0% {
        height: ${height}px;
    } 50% {
        height: ${33 * height / 100}px;
    } 100% {
        height: ${height}px;
    }
`;

const PlayingTag = styled.div<{$height: number}>`
    animation: fade-in 500ms ease;
    width: ${({$height}) => $height}px;
    height: ${({$height}) => $height}px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
        background-color: ${({theme}) => theme.accent};
        border-radius: 100px;
        display: flex;
        justify-content: space-between;
        width: ${({$height}) => $height === 30 ? 7 : 11}px;
        height: ${({$height}) => $height}px;
        animation: ${({$height}) => TagAnimation($height)} 1s ease infinite;
        
        &:first-child {
            animation: ${({$height}) => TagAnimation($height)} 1s ease infinite 0.5s;
        }

        &:last-child {
            animation: ${({$height}) => TagAnimation($height)} 1s ease infinite 0.75s;
        }
    }
`;

export const PlayingTrackTag: FC<{height?: number}> = ({height = 30}) => {    
    return (
        <PlayingTag $height={height} >
            <div></div>
            <div></div>
            <div></div>
        </PlayingTag>

    )
}