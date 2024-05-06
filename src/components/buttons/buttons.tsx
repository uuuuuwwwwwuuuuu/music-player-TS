import {FC} from 'react';
import './buttons.scss';


interface IProp {
    type: 'accent' | 'simple' | 'alternative' | 'disable',
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

const Button: FC<IProp> = ({type, W, H, content, fontS, fontW, actionType, propClassList = '', onClick = () => {}, style}) => {
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
}

export default Button;