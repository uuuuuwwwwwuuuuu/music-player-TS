import { FC, useState, useEffect, SyntheticEvent } from "react";
import './PlaySelection.scss';
import { FaRandom } from "react-icons/fa";
import { BsFillRewindFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { LuRepeat } from "react-icons/lu";
import { LuRepeat1 } from "react-icons/lu";
import { RiPlayListFill } from "react-icons/ri";
import { useAppSelector } from "../../hook";

const PlaySelection: FC = () => {
    const {currentPlayList, trackId} = useAppSelector(state => state.current);
    const currentTrack = currentPlayList.find(track => track.id === trackId);

    const [isPlay, setIsPlay] = useState(false);
    const [currentWidth, setCurrentWidth] = useState(0);

    useEffect(() => {
        currentTrack ? setIsPlay(true) : setIsPlay(false);
    }, [currentTrack])          //может быть ошибка из-за зависимости


    //______________________________________________________
    const changeIsPlay = () => {
        if (currentTrack) {
            setIsPlay(!isPlay)
        }
    }

    isPlay ? document.querySelector('audio')?.play() : document.querySelector('audio')?.pause()

    const onUpdateCurrentTime = (e: SyntheticEvent<HTMLAudioElement>) => {
        const audio = e.target as HTMLAudioElement;
        const {currentTime, duration} = audio

        setCurrentWidth(currentTime * 100 / duration);
    }


    const disableClassList = currentTrack ? '' : ' disable';

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
                    <BsFillRewindFill className={"control" + disableClassList} />
                    <FaPlay style={{display: isPlay ? 'none' : 'inline-block'}} onClick={changeIsPlay} className={"control play" + disableClassList} />
                    <FaPause style={{display: !isPlay ? 'none' : 'inline-block'}} onClick={changeIsPlay} className={"control" + disableClassList} />
                    <BsFillRewindFill className={"control next_rewind" + disableClassList} />
                    <LuRepeat className={"control" + disableClassList} />
                    <RiPlayListFill className={"current_play_list_control" + disableClassList} />
                </div>
                <div className={"music_progress" + disableClassList}>
                    <div className="progress_bar" style={{width: currentWidth + '%'}}>
                        <div className="target_circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaySelection;