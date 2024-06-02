import { FC } from 'react';

import './artistCards.scss';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IProp {
    img: string,
    name: string,
    type?: 'small' | 'big'
}

const ArtistHomeCard = styled.div<{$type: 'small' | 'big'}>`
    height: ${({$type}) => $type === 'big' ? '150px' : '100px'};
    flex: 0 0 ${({$type}) => $type === 'big' ? '110px' : '100px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    &:hover {
        span {
            color: ${({theme}) => theme.accent};
        }

        img {
            transform: scale(1.1);
        }
    }
`;

const ArtistName = styled.span<{$type: 'small' | 'big'}>`
    font-size: ${({$type}) => $type === 'big' ? '1.4rem' : '1.2rem'};
    font-weight: ${({$type}) => $type === 'big' ? 700 : 500};
    text-align: center;
    color: ${({theme}) => theme.textSecond};
    transition: 0.5s ease all;
`;

const ArtistImg = styled.div<{$type: 'small' | 'big', $img: string}>`
    width: ${({$type}) => $type === 'big' ? '100px' : '80px'};
    height: ${({$type}) => $type === 'big' ? '100px' : '80px'};
    border-radius: 100px;
    overflow: hidden;
    margin-bottom: ${({$type}) => $type === 'big' ? '15px' : '10px'};
    display: flex;
    justify-content: center;
    background-image: url(${({$img}) => $img});
    background-size: cover;
    background-position: center;
`;

export const ArtistCard: FC<IProp> = ({img, name, type='big'}) => {
    const navigate = useNavigate();

    const selectArtist = () => {
        navigate('/artist/' + name);
    }

    const cutLongString = (string: string): string => {
        if (string.length > 12 && type === 'small') {
            return string.substring(0, 10) + '...';
        }
        return string;
    }
    return (
        <ArtistHomeCard $type={type} className='artist_home_card' onClick={selectArtist}>
            <ArtistImg $img={img} $type={type}></ArtistImg>
            <ArtistName $type={type}>{cutLongString(name)}</ArtistName>
        </ArtistHomeCard>
    )
}