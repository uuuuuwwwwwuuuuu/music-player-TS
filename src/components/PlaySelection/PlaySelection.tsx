import { FC } from "react";
import './PlaySelection.scss';
import { FaRandom } from "react-icons/fa";
import { BsFillRewindFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { LuRepeat } from "react-icons/lu";
import { LuRepeat1 } from "react-icons/lu";
import { RiPlayListFill } from "react-icons/ri";

const PlaySelection: FC = () => {
    return (
        <div className="play_selection">
            <div className="left_elements">
                <img src="/img/13prichin.jpg" alt="album" />
                <div className="track_info">
                    <span>Больше не буду</span>
                    <span className="artists">Тринадцать карат, Три дня дождя</span>
                </div>
            </div>
            <div className="right_elements">
                <div className="music_controls">
                    <FaRandom className="control" />
                    <BsFillRewindFill className="control" />
                    <FaPlay className="control" />
                    <BsFillRewindFill className="control next" />
                    <LuRepeat className="control" />
                    <RiPlayListFill className="current_play_list_control" />
                </div>
                <div className="music_progress">
                    <div className="progress_bar">
                        <div className="target_circle"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaySelection;