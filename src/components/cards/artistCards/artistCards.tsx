import { FC } from 'react';

import './artistCards.scss';

interface IProp {
    img: string,
    name: string
}

export const ArtistCard: FC<IProp> = ({img, name}) => {
    return (
        <div className='artist_home_card'>
            <div className="artist_card_img">
                <img src={img} alt="Артист" />
            </div>
            <span>{name}</span>
        </div>
    )
}