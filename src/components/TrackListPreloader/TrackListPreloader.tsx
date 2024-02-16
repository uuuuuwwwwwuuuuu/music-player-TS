import {FC} from 'react';
import './TrackListPreloader.scss';

const TrackListPreloader: FC = () => {
    const wrapperWidth = document.querySelector('.liked_play_list_wrapper')?.clientHeight;

    const culcPreloaderCount = () => {
        let preloaderCount = 0;

        if (wrapperWidth) {
            for (let i = 45; i <= wrapperWidth; i = i + 45) {
                preloaderCount++
            }
        }
        return preloaderCount
    }

    const preloadersCount = culcPreloaderCount();
    const arr: number[] = []
    for (let i = 1; i < preloadersCount; i++) {
        arr.push(i);
    }
    return (
        <>
            {arr.map((_, index) => {
                return (
                    <div className="track_preloader" key={index}>
                        <div className='track_img_preloader'></div>
                        <div className='track_info_preloader'>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default TrackListPreloader;