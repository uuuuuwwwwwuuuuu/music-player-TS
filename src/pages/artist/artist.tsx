import { FC } from "react";

import './artist.scss';
import Headers from "../../components/headers/headers";
import { ITrack } from "../../store/likedPlayList/reducerLiked";

import {styled} from 'styled-components'
import Button from "../../components/buttons/buttons";
import { Follow, PlayOrPause } from "../../components/icons and tags/icons";
import { relative } from "path";

interface IArtistProps {
    big_img: string,
    name: string,
    likes: number,
    tracks: ITrack[]
}

const Artist: FC<IArtistProps> = ({name, likes, tracks, big_img}) => {
    const ArtistBG = styled.div`
        height: 350px;
        width: 100%;
        margin-top: 80px;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            background-image: url(${big_img});
            filter: brightness(60%)
        }
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 143px;
            z-index: -1;
            background: linear-gradient(180deg, rgba(27,26,28,0) 0%, rgba(27,26,28,1) 100%);
        }
  `;

    return (
        <div className="artist">
            <Headers type="main" />
            <ArtistBG>
                <div className="artist_info">
                    <span className="artist_name">{name}</span>
                    <div className="additional_artist_info">
                        <span>Артист</span>
                        <span>{likes} подписчиков</span>
                    </div>
                </div>
                <div className="artist_action_buttons">
                    <Button type="accent" W={70} H={70} style={{borderRadius: 100}} content={<PlayOrPause scale={26} style={{color: '#E0DCEA', position: 'relative', top: 2, left: 2}} />} />
                    <Button type="simple" W={50} H={50} style={{borderRadius: 100}} propClassList="follow_artist_btn" content={<Follow scale={20} style={{position: 'relative', top: 1, left: 1}}/>} />
                </div>
            </ArtistBG>
        </div>
    )
}

export default Artist;