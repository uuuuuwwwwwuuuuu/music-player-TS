import { FC, useEffect, useRef, useState } from 'react';

import './homeCards.scss';
import Button from '../../buttons/buttons';
import { PlayOrPause } from '../../icons and tags/icons';

interface IProp {
    img: string,
    category: string,
    content: string,
    additionalContent: string,
    W?: number,
    H?: number,
    onClick?: any
    style?: React.CSSProperties
}

export const HomeCard: FC<IProp> = ({W, H=200, style, img, category, content, onClick, additionalContent}) => {
    const [isHovered, setIsHovered] = useState<' home_card_hovered' | ''>('');
    
    const styles: React.CSSProperties = {
        height: H,
        backgroundImage: `url(${img})`,
        flex: `1 1 ${W ? W : 700}px`,
        animation: 'home-card-fade-in 1s ease',
        ...style
    }

    const card = useRef<null | HTMLDivElement>(null)

    const startHover = () => {
        setIsHovered(' home_card_hovered');
    }

    const endHover = () => {
        setIsHovered('');
    }

    const duration = 500;
    let startTime;

    const animateBgFadeIn = (currentTime) => {
        if (!startTime) {
            startTime = currentTime;
        }

        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const value = 100 + (110 - 100) * ease(progress);
        if (card.current) {
            card.current.style.backgroundSize = `${value}%`;
        }
        if (progress < 1) {
            requestAnimationFrame(animateBgFadeIn);
        }
    }
    const animateBgFadeOut = (currentTime) => {
        if (!startTime) {
            startTime = currentTime;
        }

        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const value = 110 + (100 - 110) * ease(progress)
        if (card.current) {
            card.current.style.backgroundSize = `${value}%`;
        }
        if (progress < 1) {
            requestAnimationFrame(animateBgFadeOut);
        }
    }

    function ease(t: number) {
        return 1 - (1 - t) ** 2;
    }

    useEffect(() => {
        if (isHovered) {
            requestAnimationFrame(animateBgFadeIn);
        } else {
            requestAnimationFrame(animateBgFadeOut);
        }
    }, [isHovered]);

    return (
        <div className={`home_card` + isHovered} ref={card} onMouseEnter={startHover} onMouseLeave={endHover} style={styles} onClick={onClick}>
            <div className='home_card_wrapper'>
                <div className='home_card_info'>
                    <div className="home_card_info_data">
                        <span className='home_card_category'>{category}</span>
                        <span className='home_card_content'>{content}</span>
                    </div>
                    <span className='home_card_additional'>{additionalContent}</span>
                </div>
                <Button W={isHovered ? 70 : 50} H={isHovered ? 70 : 50} 
                type='alternative' 
                content={<PlayOrPause 
                            style={{transition: '0.5s all ease'}} 
                            scale={isHovered ? 30 : 20} type='disable'/>}/>
            </div>
        </div>
    )
}