import { FC, useEffect, useRef } from 'react';
import './icons.scss';

import { TiHeartFullOutline } from "react-icons/ti";
import { FaPause, FaPlay, FaRandom } from 'react-icons/fa';
import { BsFillRewindFill } from 'react-icons/bs';
import { LuRepeat, LuRepeat1 } from 'react-icons/lu';
import { PiPlaylistBold } from "react-icons/pi";
import { AiOutlineFullscreen } from "react-icons/ai";
import { TbPlaylistAdd } from "react-icons/tb";

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
    return <TiHeartFullOutline className={getClassList(type, className) + 
                type === 'idle' || 'disable' ? ' like_icon' : ''}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
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
    return <AiOutlineFullscreen className={getClassList(type, className)}
                style={{width: `${scale}px`, height: `${scale}px`, ...style}}/>
}

export const PlayingTrackTag: FC = () => {    
    return (
        <div className='playing_track_tag'>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}