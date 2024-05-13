import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import './Main.scss';
import Button from "../../components/buttons/buttons";
import { HomeCard } from "../../components/cards/homeCards/homeCards";
import { ArtistCard } from "../../components/cards/artistCards/artistCards";
import { useAppSelector } from "../../hook";
import { ArtistsError } from "../../components/errorMessages/artistsError";
import { HomeTrackCard } from "../../components/cards/homeTrackCards/homeTrackCards";


const Main: FC = () => {
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

    return (
        <>
            <div className='main'>
                <main>
                    <div className="cards_wrapper">
                        <div className="cards">
                            <HomeCard 
                                W={800} category="Артист месяца" content="Тринадцать карат" 
                                additionalContent="242412 прослушиваний"
                                img="/img/homecard1.jpg" />
                            <HomeCard 
                                W={530} category="Лучшее" content="в BROOKLYN" 
                                additionalContent="Моргенштерн, Тринадцать карат ..."
                                img="/img/homecard2.jpeg" />
                        </div>
                        <div className="cards">
                            <HomeCard 
                                W={530} category="ТОП" content="в Стране" 
                                additionalContent="Тима белорусских, Макс Корж ..."
                                img="/img/homecard3.jpeg" />
                            <HomeCard 
                                W={800} category="Подборка" content="Для вас" 
                                additionalContent="Nikitata, Тринадцать карат, Три дня до..."
                                img="/img/homecard4.jpeg" />
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