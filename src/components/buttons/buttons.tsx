import {FC} from 'react';
import './buttons.scss';

import { Link } from 'react-router-dom';


interface IProp {
    type: 'accent' | 'simple' | 'alternative' | 'disable',
    isLink?: boolean,
    path?: string,
    W: number,
    H: number,
    content: string | React.ReactNode,
    fontS?: number,
    fontW?: number,
    actionType?: undefined | 'submit',
    propClassList?: string,
    onClick?: any,
    style?: React.CSSProperties
}

const Button: FC<IProp> = ({type, W, H, content, fontS, fontW, actionType, propClassList = '', onClick = () => {}, style, isLink, path}) => {
    if (!isLink) {
        let genericClassName: typeof type = 'accent' 
    
        if (type === 'alternative') {
            genericClassName = 'alternative';
        } else if (type === 'simple') {
            genericClassName = 'simple';
        } else if (type === 'accent') {
            genericClassName = 'accent';
        } else {
            genericClassName = 'disable';
        }
    
        return (
            <button
                type={actionType ? actionType : 'button'}
                className={genericClassName + ` general_btn ${propClassList}`}
                style={{width: `${W}px`, height: `${H}px`, fontSize: `${fontS}rem`, fontWeight: fontW, ...style}}
                onClick={onClick}>
                    {content}
            </button>
        )
    } else {
        let genericClassName: typeof type = 'accent' 

        if (type === 'alternative') {
            genericClassName = 'alternative';
        } else if (type === 'simple') {
            genericClassName = 'simple';
        } else if (type === 'accent') {
            genericClassName = 'accent';
        } else {
            genericClassName = 'disable';
        }

        genericClassName += ' link';
        if (path) {
            return (
                <Link
                    type={actionType ? actionType : 'button'}
                    className={genericClassName + ` general_link ${propClassList}`}
                    style={{width: `${W}px`, height: `${H}px`, fontSize: `${fontS}rem`, fontWeight: fontW,...style}}
                    onClick={onClick}
                    to={path}>
                        {content}
                </Link>
            )
        } else {
            throw new Error(`Необходимо добавить path в ссылку (content: ${content})`)
        }
    }
}

export default Button;