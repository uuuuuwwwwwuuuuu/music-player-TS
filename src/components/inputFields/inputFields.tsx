import { FC } from 'react';

import './inputFields.scss';

interface IProp {
    type: string,
    H: number,
    fontW?: number,
    fontS?: number,
    W?: number,
    name?: string,
    id?: string,
    onChange?: any,
    placeholder?: string,
    required?: boolean,
    style?: React.CSSProperties,
    className?: string,
}

export const Input: FC<IProp> = ({
    W, H, type, name, id, 
    onChange, placeholder, 
    required, style, className = '',
    fontS, fontW
}) => {
    if (!required) {
        return <input type={type} onChange={onChange} id={id} name={name} placeholder={placeholder} 
                    className={'input_field_component ' + className} 
                    style={{width: `${W}px`, height: `${H}px`, fontWeight: fontW, fontSize: `${fontS}rem`, ...style}} />
    } else {
        return <input type={type} onChange={onChange} id={id} name={name} placeholder={placeholder} 
                    className={'input_field_component ' + className} required
                    style={{width: `${W}px`, height: `${H}px`, fontWeight: fontW, fontSize: `${fontS}rem`, ...style}} />
    }
}