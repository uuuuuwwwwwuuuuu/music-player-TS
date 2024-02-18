import {FC} from 'react';
import './Settings.scss';

const Settings: FC = () => {
    return (
        <div className='Settings'>
            <header>
                <span>Настройки</span>
            </header>
            <div className='style_settings'>
                <span className='style'>Вид</span>
                <ul className='style_ul'>
                    <li>
                        <span className='color_palette'>Цветовая палитра</span>
                        <ul>
                            <li className='color_li'>
                                <span className='li_item_color'>Цвет фона</span>
                                <div className='color_picker bg_color_1'></div>
                                <div className='color_picker bg_color_2 active_color'></div>
                                <div className='color_picker bg_color_3'></div>
                                <div className='color_picker bg_color_4'></div>
                            </li>
                            <li className='color_li'>
                                <span className='li_item_color'>Цвет акцента</span>
                                <div className='color_picker accent_color_1 active_color'></div>
                                <div className='color_picker accent_color_2'></div>
                                <div className='color_picker accent_color_3'></div>
                            </li>
                        </ul>
                    </li>
                    <li className='font_li'>
                        <span className='font_size'>Размер шрифта</span>
                        <ul className='font_ul'>
                            <li>
                                <div className='font_selector active_font_selector'>Крупный</div>
                            </li>
                            <li>
                                <div className='font_selector'>Средний</div>
                            </li>
                            <li>
                                <div className='font_selector'>Мелкий</div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <h1>Функционал не реализован в связи с отсутствием соеденения с сервером</h1>
            </div>
        </div>
    )
}

export default Settings;