import { FC } from 'react';

import './artistCards.scss';
import { useAppDispatch } from '../../../hook';
import { useNavigate } from 'react-router-dom';

interface IProp {
    img: string,
    name: string
}

export const ArtistCard: FC<IProp> = ({img, name}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectArtist = () => {
        navigate('/artist/' + name);
    }

    return (
        <div className='artist_home_card' onClick={selectArtist}>
            <div className="artist_card_img">
                <img src={img} alt="Артист" />
            </div>
            <span>{name}</span>
        </div>
    )
}