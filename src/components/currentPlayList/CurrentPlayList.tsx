import { FC, useEffect, useState } from 'react';
import './CurrentPlayList.scss';
import { useAppDispatch } from '../../hook';
import { showCurrentPlayListAction } from '../../store/current/actionsCurrent';

type props = {
    showPlayList: boolean
}

interface ICurrentPlayListState {
    opacity: number,
    position: string,
    display: string,
    pointerEvents: undefined | 'none'
}

const CurrentPlayList: FC<props> = ({showPlayList}) => {
    const [params, setParams] = useState<ICurrentPlayListState>({opacity: 0, position: '-460px', display: 'none', pointerEvents: undefined});
    const {opacity, position, display, pointerEvents} = params;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!showPlayList) {
            setParams({display: 'none', opacity: 0, position: '-460px', pointerEvents: 'none'})
        } else {
            setParams({display: 'block', opacity: 0.3, position: '10px', pointerEvents: undefined});
        }
    }, [showPlayList]);

    const handleOverlay = () => {
        dispatch(showCurrentPlayListAction(false));
    }

    return (
        <>
            <div style={{right: position}} className="current_play_list">
                
            </div>
            <div onClick={handleOverlay} style={{opacity: opacity, display: display, pointerEvents: pointerEvents}} className='current_play_list_wrapper'></div>
        </>
    )
}

export default CurrentPlayList;