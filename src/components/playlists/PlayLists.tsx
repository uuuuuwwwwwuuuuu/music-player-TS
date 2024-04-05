import { FC } from 'react';
import './PlayLists.scss';
import { IPlayList } from '../../store/playlists/reducerPlaylists';
import { IoHeart } from 'react-icons/io5';

type props = {
    playlistsArr: IPlayList[];
}

const PlayLists: FC<props> = ({playlistsArr}) => {


    return (
        <>
            {playlistsArr.map(item => {
                return (
                    <div className='playlist_card' key={item.id}>
                        {item.img 
                            ? <img src={item.img} alt='Фото альбома' />
                            : <div className='custom_album_bg'><IoHeart /></div>}
                        <div className='playlist_card_info'>
                            <span>{item.title}</span>
                            <div className='playlist_card_count'>{item.playlist.length} треков</div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default PlayLists;