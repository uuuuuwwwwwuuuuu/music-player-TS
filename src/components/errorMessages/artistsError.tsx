import { FC } from 'react';
import { MdOutlineError } from "react-icons/md";
import './artistsError.scss';

interface IProp {
    errorMessage: string
}

export const ArtistsError: FC<IProp> = ({errorMessage}) => {
    return (
        <div className='artists_error'>
            <MdOutlineError style={{marginRight: 20}} />
            <span>{errorMessage}</span>
            <MdOutlineError />
        </div>
    )
}