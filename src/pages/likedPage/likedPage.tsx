import { ChangeEvent, FC, useEffect, useState } from "react";

import './likedPage.scss';
import styled from "styled-components";
import { useAppSelector } from "../../hook";
import { Input } from "../../components/inputFields/inputFields";
import Button from "../../components/buttons/buttons";
import { HomeTrackCard } from "../../components/cards/homeTrackCards/homeTrackCards";
import { ITrack } from "../../store/likedPlayList/reducerLiked";

const Background = styled.div`
    height: 333px;
    width: 100%;
    margin-top: 80px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    margin-bottom: 20px;

    .video_wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        video {
            filter: hue-rotate(300deg) blur(6px) brightness(60%);
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 150px;
        background: linear-gradient(180deg, rgba(27,26,28,0) 0%, rgba(27,26,28,1) 100%);
        z-index: 2;
    }
`;

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    display: flex;
    flex-direction: column;
`;

const GridContainer = styled.div<{$isNoData: boolean}>`
    width: 100%;
    border-radius: 16px;
    margin-top: 20px;

    display: ${({$isNoData}) => $isNoData ? 'block' : 'grid'};
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
`

const NoDataDiv = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
    color: ${({theme}) => theme.textDisable};
`

const LikedPage: FC = () => {
    const {likedTrackList} = useAppSelector(state => state.liked);
    const trackId = useAppSelector(state => state.current.trackId);
    const [dataArr, setDataArr] = useState<ITrack[]>([]);
    const [searchStr, setSearchStr] = useState('');

    const [isPopular, setIsPopular] = useState(false);

    const renderLikedTrackList = () => {
        if (likedTrackList.length !== 0) {
            if (searchStr) {
                const subDataArr = dataArr.filter(item => item.title.toLowerCase().includes(searchStr.toLowerCase()));
                return subDataArr.map(item => {
                    return <HomeTrackCard key={item.id} track={item} playList={dataArr}/>
                });
            } else {
                return dataArr.map(item => {
                    return <HomeTrackCard key={item.id} track={item} playList={dataArr}/>
                });
            }
        } else {
            return (
                <NoDataDiv><span>Вы не добавили ни одного трека</span></NoDataDiv>
            )
        }
    }

    useEffect(() => {
        if (likedTrackList.length !== 0) {
            if (isPopular) {
                const oldArr = [...likedTrackList];
                const sortedArr = oldArr.sort((a, b) => b.auditions - a.auditions);
                setDataArr(sortedArr);
            } else {
                setDataArr(likedTrackList);
            }
        }
    }, [isPopular, likedTrackList]);

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchStr(e.target.value);
    }

    return (
        <div className="liked_page" style={{paddingBottom: trackId ? '40px' : 0}}>
            <Background>
                <div className="video_wrapper">
                    <video autoPlay loop muted src={process.env.PUBLIC_URL + '/music-player-TS/video/likedVideo.webm'} />
                </div>
                <div className="liked_title_wrapper">
                    <span className="liked_title">Любимые треки</span>
                    <div>
                        <span>BROOKLYN</span>
                        <span>{likedTrackList.length} треков</span>
                    </div>
                </div>
            </Background>
            <Container >
                <div className="action_row">
                    <Input onChange={onSearch} type="text" placeholder="Поиск" H={40} W={446}/>
                    <div className="liked_btns_wrapper">
                        <Button 
                            onClick={() => setIsPopular(false)} 
                            type={isPopular ? 'simple' : "accent"}
                            W={250} H={40} fontS={1.6} 
                            fontW={600} content='С начала новые' />
                        <Button 
                            onClick={() => setIsPopular(true)} 
                            type={isPopular ? "accent" : "simple"} 
                            W={250} H={40} fontS={1.6} 
                            fontW={600} content='С начала популярные' />
                    </div>
                </div>
                <GridContainer $isNoData={likedTrackList.length === 0} >
                    {renderLikedTrackList()}
                </GridContainer>
            </Container>
        </div>
    ) 
}

export default LikedPage;