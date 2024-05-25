import { FC, useEffect, useState } from "react";
import './asideBar.scss';
import styled from "styled-components";
import { useAppSelector } from "../../hook";
import Button from "../buttons/buttons";
import SmallTrackCard from "../cards/smallTrackCard/smallTrackCard";
import { ArtistCard } from "../cards/artistCards/artistCards";
import { IArtist } from "../../store/artists/reducerArtists";
import { useNavigate } from "react-router-dom";

const AsideBarComponent = styled.aside<{$isPlayList: boolean, $isHovered: boolean}>`
    width: 400px;
    background-color: ${({theme}) => theme.secondBgBlur};
    backdrop-filter: blur(20px);
    position: fixed;
    top: 90px;
    left: ${({$isHovered}) => $isHovered ? '40px' : '-398px'};
    height: calc(100svh - ${({$isPlayList}) => $isPlayList ? '190px' : '110px'});
    border-radius: 15px;
    transition: 500ms ease all;
    z-index: 100;
    border: 1px solid #c5c4c652;
    opacity: ${({$isHovered}) => $isHovered ? 1 : 0};
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    flex-direction: column;

    &::before {
        content: '';
        width: 42px;
        height: calc(100svh - ${({$isPlayList}) => $isPlayList ? '190px' : '110px'});
        position: absolute;
        top: 0;
        left: -42px;
    }
`;

const FlexRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        font-size: 2rem;
        font-weight: 700;
    }
` ;

const NoDataSpan = styled.span`
    font-size: 1.6rem;
    font-weight: 400;
    color: ${({theme}) => theme.textSecond};
    margin-top: 10px;
    width: 100%;
    text-align: center;
`;

const ArtistsGridWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 100px));
    gap: 20px;
    width: 100%;
`

const AsideBar: FC = () => {
    const {trackId, currentPlayList} = useAppSelector(state => state.current)
    const {likedTrackList, loading: tracksLoading} = useAppSelector(state => state.liked);
    const {likedArtists, loading: artistsLoading} = useAppSelector(state => state.likedArtists);

    const [showPlayList, setShowPlayList] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isPopular, setIsPopular] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (trackId && currentPlayList.length > 0) {
            setShowPlayList(true)
        } else {
            setShowPlayList(false)
        }
    }, [currentPlayList.length, trackId]);

    const renderLikedTrackList = () => {
        if (!tracksLoading) {
            if (likedTrackList.length === 0) {
                return <NoDataSpan>Вы не добавили ни одного трека</NoDataSpan>
            } else {
                return likedTrackList.map(item => {
                    return <SmallTrackCard isLiked track={item} playList={likedTrackList} key={item.id}/>
                })
            }
        } else {
            return <div className="loading"></div>
        }
    };

    const renderLikedArtists = () => {
        if (!artistsLoading) {
            if (likedArtists.length === 0) {
                return <NoDataSpan>Вы не подписаны ни на одного артиста</NoDataSpan>
            } else {
                if (isPopular) {
                    const artistsListCopy = [...likedArtists];
                    const sortedArr = artistsListCopy.sort((a, b) => b.likes - a.likes);
                    return sortedArr.map(item => {
                        return <ArtistCard name={item.name} img={item.artistImg} type='small' />
                    })
                } else {
                    return likedArtists.map(item => {
                        return <ArtistCard name={item.name} img={item.artistImg} type='small' />
                    })
                }
            }
        }
    }

    useEffect(() => {
        setIsHovered(false);
    }, [navigate])

    return (
        <AsideBarComponent $isHovered={isHovered} $isPlayList={showPlayList} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <FlexRow>
                <span>Любимые треки</span>
                <Button type="alternative" W={135} H={24} fontS={1.2} content='Посмотреть всё'/>
            </FlexRow>
            <div className="aside_liked_track_list">
                {renderLikedTrackList()}
            </div>
            <FlexRow style={{marginTop: 10}}>
                <span>Любимые артисты</span>
                <Button 
                    type={isPopular ? 'accent' : 'alternative'} onClick={() => setIsPopular(!isPopular)} 
                    W={150} H={24} fontS={1.2} fontW={isPopular ? 500 : 400} content='Сначала популярные'
                    style={{borderRadius: 100}}/>
            </FlexRow>
            <div className="aside_artist_list">
                <ArtistsGridWrapper>
                    {renderLikedArtists()}
                </ArtistsGridWrapper>
            </div>
        </AsideBarComponent>
    )
}

export default AsideBar;