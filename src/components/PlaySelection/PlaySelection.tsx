import { FC, useState, useEffect, SyntheticEvent } from "react";
import './PlaySelection.scss';
import { FaRandom } from "react-icons/fa";
import { BsFillRewindFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { LuRepeat } from "react-icons/lu";
import { LuRepeat1 } from "react-icons/lu";
import { RiPlayListFill } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../hook";
import { ITrack } from "../../store/likedPlayList/reducerLiked";
import { selectCurrentTrack } from "../../store/current/actionsCurrent";

const PlaySelection: FC = () => {
    const {currentPlayList, trackId} = useAppSelector(state => state.current);
    const dispatch = useAppDispatch();
    
    const [isPlay, setIsPlay] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentTrack, setCurrentTrack] = useState<ITrack | undefined>(undefined)
    

    useEffect(() => {
        if (currentPlayList.length !== 0 && currentTrack?.id !== trackId) {
            setCurrentTrack(currentPlayList.find(item => item.id === trackId));
        }

        if (currentTrack?.id !== trackId) {
            setIsPlay(true);
        }

        isPlay ? document.querySelector('audio')?.play() : document.querySelector('audio')?.pause()

    }, [trackId, isPlay, currentTrack, currentPlayList])          //может быть ошибка из-за зависимости
    
    const disableClassList = currentTrack ? '' : ' disable';
    //______________________________________________________
    const changeIsPlay = () => {
        if (currentTrack) {
            setIsPlay(!isPlay);
        }
    }

    const prevTrack = () => {
        const currentIndex = currentPlayList.findIndex(item => item.id === currentTrack?.id);

        if (currentIndex === 0) {
            dispatch(selectCurrentTrack(currentPlayList[currentPlayList.length - 1].id))
        } else {
            dispatch(selectCurrentTrack(currentPlayList[currentIndex - 1].id));
        }
    }

    const nextTrack = () => {
        const currentIndex = currentPlayList.findIndex(item => item.id === currentTrack?.id);

        if (currentIndex >= currentPlayList.length - 1) {
            dispatch(selectCurrentTrack(currentPlayList[0].id))
        } else {
            dispatch(selectCurrentTrack(currentPlayList[currentIndex + 1].id))
        }
    }

    const onUpdateCurrentTime = (e: SyntheticEvent<HTMLAudioElement>) => {
        const audio = e.target as HTMLAudioElement;
        const {currentTime, duration} = audio

        setCurrentWidth(currentTime * 100 / duration);
    }

    const setCurrentTime = (e: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
        const song = document.querySelector('audio');
        const offsetX = e.nativeEvent.offsetX;
        const clientWidth = document.querySelector('.music_progress')?.clientWidth;

        if (song && clientWidth) {
            song.currentTime = (offsetX / clientWidth) * song?.duration;
        }
    }


    return (
        <div className="play_selection">
            {
                currentTrack &&
                <div className="left_elements">
                    <img src={currentTrack.albumImg} alt="album" />
                    <div className="track_info">
                        <span>{currentTrack.title}</span>
                        <span className="artists">{currentTrack.artists}</span>
                    </div>
                    <audio onTimeUpdate={onUpdateCurrentTime} src={currentTrack.music} />
                </div>
            }

            <div className="right_elements">
                <div className="music_controls">
                    <FaRandom className={"control" + disableClassList} />
                    <BsFillRewindFill className={"control" + disableClassList} onClick={prevTrack}/>
                    <FaPlay style={{display: isPlay ? 'none' : 'inline-block'}} onClick={changeIsPlay} className={"control play" + disableClassList} />
                    <FaPause style={{display: !isPlay ? 'none' : 'inline-block'}} onClick={changeIsPlay} className={"control" + disableClassList} />
                    <BsFillRewindFill className={"control next_rewind" + disableClassList} onClick={nextTrack}/>
                    <LuRepeat className={"control" + disableClassList} />
                    <RiPlayListFill className={"current_play_list_control" + disableClassList} />
                </div>
                <div className={"music_progress" + disableClassList} onClick={setCurrentTime}>
                    <div className="progress_bar" style={{width: currentWidth + '%'}}>
                        <div className="target_circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaySelection;