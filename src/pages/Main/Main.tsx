import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import './Main.scss';
import Button from "../../components/buttons/buttons";
import { HomeCard } from "../../components/cards/homeCards/homeCards";
import { ArtistCard } from "../../components/cards/artistCards/artistCards";
import { useAppDispatch, useAppSelector } from "../../hook";
import { ArtistsError } from "../../components/errorMessages/artistsError";
import { HomeTrackCard } from "../../components/cards/homeTrackCards/homeTrackCards";
import { selectCurrentTrack, selectPlayList } from "../../store/current/actionsCurrent";
import { ITrack } from "../../store/likedPlayList/reducerLiked";
import { shuffle } from "../audioModule/audioModule";


const Main: FC = () => {
    const dispatch = useAppDispatch();

    const {artists, error: artistError, loading: artistLoading} = useAppSelector(state => state.artists);
    const {trackList, error: tracksError, loading: tracksLoading} = useAppSelector(state => state.trackList);

    const [isButtonShow, setIsButtonShow] = useState<boolean>(false);
    const [translateValue, setTranslateValue] = useState<number>(0);

    const artistLine = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const artistLineWidth = artistLine.current?.clientWidth;
        const artistsCardsWidth = 130 * artists.length;

        if (artistLineWidth) {
            setIsButtonShow(artistLineWidth >= artistsCardsWidth - translateValue ? false : true)
        }
    }, [artists.length, translateValue]);

    const slideToNextArtistPage = (e: MouseEventHandler<HTMLButtonElement>) => {
        if (artistLine.current) {
            const newTranslateValue = translateValue + artistLine.current.clientWidth - 150
            setTranslateValue(newTranslateValue);
        }
    }

    const slideToPrevArtistPage = () => {
        if (artistLine.current) {
            const newTranslateValue = translateValue - artistLine.current.clientWidth + 150
            setTranslateValue(newTranslateValue);
        }
    }

    const renderArtists = () => {
        if (artists) {
            if (!artistError) {
                return artists.map(({name, artistImg, id}) => {
                    return <ArtistCard key={id} name={name} img={artistImg}/>
                })
            } else {
                return <ArtistsError errorMessage={artistError}/>
            }
        }
    }

    const renderTracks = () => {
        if (trackList) {
            if (!tracksError) {
                return trackList.map(item => {
                    return <HomeTrackCard key={item.id} track={item} playList={trackList}/>
                })
            } else {
                return <ArtistsError errorMessage={tracksError}/>
            }
        }
    }

    const setArtistOfMonthPlayList = () => {
        const tracks = trackList.filter(item => item.artists === 'Тринадцать карат');
        if (tracks) {
            dispatch(selectPlayList(tracks.sort((a, b) => b.auditions - a.auditions)));
            dispatch(selectCurrentTrack(tracks[0].id));
        }
    }

    const setBestInBrooklyn = () => {
        const oldArr = [...trackList];
        const sortedArr = oldArr.sort((a, b) => a.auditions - b.auditions);
        const currentArray: ITrack[] = [];
        for (let i = 0; i <= 9; i++) {
            currentArray.push(sortedArr[i]);
        }
        dispatch(selectPlayList(currentArray));
        dispatch(selectCurrentTrack(currentArray[0].id));
    }

    const setBestInCountry = () => {
        const tracks = trackList.filter(item => item.artists === 'Макс корж' || item.artists === 'Тима Белоруских');
        if (tracks) {
            dispatch(selectPlayList(tracks));
            dispatch(selectCurrentTrack(tracks[0].id))
        }
    }

    const bestForYou = () => {
        const shuffledArr = shuffle(trackList);
        const currentArray: ITrack[] = []
        for (let i = 0; i <= 9; i++) {
            currentArray.push(shuffledArr[i]);
        }
        dispatch(selectPlayList(currentArray));
        dispatch(selectCurrentTrack(currentArray[0].id))
    }

    return (
        <>
            <div className='main'>
                <main>
                    <div className="cards_wrapper">
                        <div className="cards">
                            <HomeCard 
                                onClick={setArtistOfMonthPlayList}
                                W={800} category="Артист месяца" content="Тринадцать карат" 
                                additionalContent="242412 прослушиваний"
                                img={process.env.PUBLIC_URL + "/music-player-TS/img/homecard1.jpg"}/>
                            <HomeCard 
                                onClick={setBestInBrooklyn}
                                W={530} category="Лучшее" content="в BROOKLYN" 
                                additionalContent="Моргенштерн, Тринадцать карат ..."
                                img={process.env.PUBLIC_URL + "/music-player-TS/img/homecard2.jpeg"} />
                        </div>
                        <div className="cards">
                            <HomeCard 
                                onClick={setBestInCountry}
                                W={530} category="ТОП" content="в Стране" 
                                additionalContent="Тима белорусских, Макс Корж ..."
                                img={process.env.PUBLIC_URL + "/music-player-TS/img/homecard3.jpeg"} />
                            <HomeCard 
                                onClick={bestForYou}
                                W={800} category="Подборка" content="Для вас" 
                                additionalContent="Nikitata, Тринадцать карат, Три дня до..."
                                img={process.env.PUBLIC_URL + "/music-player-TS/img/homecard4.jpeg"}/>
                        </div>
                        <div className="home_artists_line">
                            <span>Артисты</span>
                            {translateValue ? <div className="shade"></div> : null}
                            <div ref={artistLine} className="artists_line">
                                {translateValue 
                                    ? <Button onClick={slideToPrevArtistPage} 
                                    type="alternative" W={50} H={50} fontS={3.2} content='<'/> 
                                    : null}

                                <div style={{transform: `translate(${-translateValue}px)`, 
                                            justifyContent: artistLoading ? 'center' : 'flex-start'}} 
                                className="artists_line_wrapper">
                                    {artistLoading ? <div className="loader"></div> : renderArtists()}
                                </div>
                                
                                {isButtonShow 
                                    && <Button onClick={slideToNextArtistPage} 
                                    type="alternative" W={50} H={50} fontS={3.2} content='>'/>}
                            </div>
                        </div>
                    </div>
                    <div className="something_new">
                        <span className="something_new_title">Что-то новое</span>
                        <div style={{justifyContent: tracksLoading ? 'center' : 'space-between'}} className="home_track_cards_wrapper">
                            {tracksLoading ? <div className="loader"></div> : renderTracks()}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );

}

export default Main;