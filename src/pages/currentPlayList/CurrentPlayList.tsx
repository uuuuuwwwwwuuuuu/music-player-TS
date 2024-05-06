import { FC, useEffect, useState } from 'react';
import './CurrentPlayList.scss';
import { useAppDispatch, useAppSelector } from '../../hook';
import { selectCurrentTrack, showCurrentPlayListAction } from '../../store/current/actionsCurrent';
import TrackItem from '../TrackItem/TrackItem';
import { IoIosMusicalNote } from "react-icons/io";

type props = {
    showPlayList: boolean,
    isFullScreen: boolean
}

interface ICurrentPlayListState {
    opacity: number,
    position: string,
    display: string,
    pointerEvents: undefined | 'none'
}

const CurrentPlayList: FC<props> = ({showPlayList, isFullScreen}) => {
    const dispatch = useAppDispatch();
    const {currentPlayList, shuffledArr, trackId} = useAppSelector(state => state.current)

    const [params, setParams] = useState<ICurrentPlayListState>({opacity: 0, position: '-460px', display: 'none', pointerEvents: undefined});
    const {opacity, position, display, pointerEvents} = params;

    useEffect(() => {
        if (!showPlayList) {
            setParams({display: 'none', opacity: 0, position: '-460px', pointerEvents: 'none'})
        } else {
            setParams({display: 'block', opacity: 0.3, position: '10px', pointerEvents: undefined});
        }

        if (isFullScreen) {
            setParams({...params, display: 'block', opacity: 0.3, pointerEvents: undefined});
        }
    }, [showPlayList, isFullScreen]);

    const handleOverlay = () => {
        dispatch(showCurrentPlayListAction(false));
    }

    const onSelect = (id: string) => {
        dispatch(selectCurrentTrack(id));
    }

    return (
        <>
            <div style={{right: position}} className="current_play_list">
                <div className='current_play_list_header'>
                    <IoIosMusicalNote className='play_list_icon'/>
                    <span>Текущий плейлист</span>
                </div>
                {
                    shuffledArr.length !== 0
                        ? shuffledArr.map(item => <TrackItem id={item.id} albumImg={item.albumImg} title={item.title} artists={item.artists} additionalFunction={onSelect} key={item.id} current={item.id !== trackId && true} />)
                        : currentPlayList.map(item => <TrackItem id={item.id} albumImg={item.albumImg} title={item.title} artists={item.artists} additionalFunction={onSelect} key={item.id} current={item.id !== trackId && true} />)
                }
            </div>
            <div onClick={handleOverlay} style={{opacity: opacity, display: display, pointerEvents: pointerEvents}} className='current_play_list_wrapper'></div>
        </>
    )
}

export default CurrentPlayList;