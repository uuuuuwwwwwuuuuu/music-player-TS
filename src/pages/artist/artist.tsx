import { FC, useEffect, useState } from "react";

import './artist.scss';
import Headers from "../../components/headers/headers";

import {styled} from 'styled-components'
import Button from "../../components/buttons/buttons";
import { Follow, PlayOrPause, UnFollow } from "../../components/icons and tags/icons";
import ArtistTrackCard from "../../components/cards/artistTrackCards/artistTrackCards";
import { useAppDispatch, useAppSelector } from "../../hook";
import { loadArtistTracks } from "../../store/artistsTracks/reducerArtistsTracks";
import { HomeTrackCard } from "../../components/cards/homeTrackCards/homeTrackCards";
import { selectCurrentTrack, selectPlayList } from "../../store/current/actionsCurrent";
import { toggleArtist } from "../../store/likedArtists/reducerLikedArtists";
import { addNotification } from "../../store/notificationQueue/actionsNotification";
import {v4 as randomId} from 'uuid';

const PopularTrackListWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px; 
    margin: 20px 0;
`;

const ArtistBG = styled.div<{$big_img: string}>`
        height: 350px;
        width: 100%;
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
            z-index: 1;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            background-image: url(${({$big_img}) => $big_img});
            filter: brightness(60%)
        }
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 143px;
            z-index: 1;
            background: linear-gradient(180deg, rgba(27,26,28,0) 0%, rgba(27,26,28,1) 100%);
        }
    `;

const MoreTracksWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    margin: 20px 0;
`;

const ErrorBlock = styled.div`

`;

interface IProp {
    artistName: string
}

const Artist: FC<IProp> = ({artistName}) => {
    const dispatch = useAppDispatch();
    const {tracks: trackList, loading, error} = useAppSelector(state => state.artistsTracks)
    const artist = useAppSelector(state => state.artists.artists.find(artist => artist.name === artistName));
    const likedArtistList = useAppSelector(state => state.likedArtists.likedArtists);

    const [isLikedArtist, setIsLikedArtist] = useState(false);

    useEffect(() => {
        if (artist) {
            dispatch(loadArtistTracks(artist.tracks));
        }
    }, [dispatch, artist]);

    useEffect(() => {
        const isLikedArtist = likedArtistList.find(item => item.name === artistName);
        if (isLikedArtist) {
            setIsLikedArtist(true);
        } else {
            setIsLikedArtist(false);
        }
    }, [artistName, likedArtistList]);

    const renderBetterTracks = (isBetter: boolean) => {
        if (trackList.length !== 0) {
            const newTrackList = [...trackList];
            const sortedTrackList = newTrackList.sort((a, b) => {
                return b.auditions - a.auditions
            });

            if (isBetter) {
                return (
                    <>
                        {
                            sortedTrackList.map((item, index) => {
                                if (index >= 3) {
                                    return null
                                } else {
                                    return <ArtistTrackCard key={item.id} playList={sortedTrackList} track={item} />
                                }
                            })
                        }
                    </>
                )
            } else {
                return (
                    <>
                        {
                            sortedTrackList.map((item, index) => {
                                if (index <= 2) {
                                    return null;
                                } else {
                                    return <HomeTrackCard key={item.id} track={item} playList={sortedTrackList} />
                                }
                            })
                        }
                    </>
                )
            }
        }
    }

    const setCurrentTrack = () => {
        const newTrackList = [...trackList];
        const sortedTrackList = newTrackList.sort((a, b) => {
            return b.auditions - a.auditions
        });
        dispatch(selectCurrentTrack(sortedTrackList[0].id));
        dispatch(selectPlayList(sortedTrackList));
    }

    const toggleIsFollowed = () => {
        if (artist) {
            dispatch(toggleArtist(artist.id))
            dispatch(addNotification({
                notificationId: randomId(),
                img: artist.artistImg,
                info: artist.name,
                additionalInfo: !isLikedArtist ? 'Вы <span>подписались</span> на артиста' : 'Вы <span>отписались</span> от артиста'
            }));
        }
    }

    if (artist) {
        return (
            <main className="artist">
                <ArtistBG id="bg" $big_img={artist.big_img}>
                    <div className="artist_info">
                        <span className="artist_name">{artist.name}</span>
                        <div className="additional_artist_info">
                            <span>Артист</span>
                            <span>{artist.likes} подписчиков</span>
                        </div>
                    </div>
                    <div className="artist_action_buttons">
                        <Button type="accent" W={70} H={70} style={{borderRadius: 100}} onClick={setCurrentTrack} content={<PlayOrPause scale={26} style={{color: '#E0DCEA', position: 'relative', top: 2, left: 2}} />} />
                        <Button 
                        onClick={toggleIsFollowed}
                        type="simple" W={50} H={50} 
                        style={{borderRadius: 100}} propClassList="follow_artist_btn" 
                        content={isLikedArtist
                            ? <UnFollow scale={20} style={{position: 'relative', top: 1, left: 1}}/>
                            : <Follow scale={20} style={{position: 'relative', top: 1, left: 1}}/>} />
                    </div>
                </ArtistBG>
                <div className="artist_tracks_wrapper">
                    <span className="artist_track_title">Популярные треки</span>
                    <PopularTrackListWrapper>
                        {loading && !error ? <div className='loader'></div> : renderBetterTracks(true)}
                    </PopularTrackListWrapper>
                    <span className="artist_track_title">Другие треки от {artist.name}</span>
                    <MoreTracksWrapper >
                        {loading && !error ? <div className="loader"></div> : renderBetterTracks(false)}
                    </MoreTracksWrapper>
                </div>
            </main>
        )
    } else {
        return (
            <main className="artist">
                <Headers type="main" />
                <ErrorBlock>

                </ErrorBlock>
            </main>
        )
    }
}

export default Artist;