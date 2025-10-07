import { ChangeEvent, FC, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hook";
import { Cross, UserIcon } from "../icons and tags/icons";
import Button from "../buttons/buttons";
import { logoutUser, setUserPhoto, toggleShowUserData } from "../../store/user/actionsUser";
import { logout } from "../../pages/authAfterReg/authAfterReg";
import { useNavigate } from "react-router-dom";

const AccountBar = styled.aside<{$isShow: boolean}>`
    width: 450px;
    box-sizing: border-box;
    padding: 20px;
    position: fixed;
    top: 90px;
    right: ${({$isShow}) => $isShow ? '40px' : '-452px'};
    transition: 0.7s ease all;
    backdrop-filter: blur(20px);
    background-color: ${({theme}) => theme.secondBgBlur};
    border: 1px solid ${({theme}) => theme.border};
    border-radius: 15px;
    z-index: 20;
`;

interface ITextSpan {
    $fontSize: 'big' | 'small',
    $fontWeight: 'bold' | 'medium',
    $color: 'content' | 'disable'
};

const FlexRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const BackBtn = styled.button`
    width: 30px;
    height: 30px;
    border-radius: 100px;
    background-color: ${({theme}) => theme.mainBgBlur};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
        color: ${({theme}) => theme.textSecond};
    }

    &:hover {
        svg {
            color: ${({theme}) => theme.accent};
        }
    }
`;

const AccountData = styled.div`
    width: 100%;
    height: 140px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.mainBgBlur};
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 10px;
`;

const TextSpan = styled.span<ITextSpan>`
    font-size: ${({$fontSize}) => $fontSize === 'big' ? 2 : 1.5}rem;
    font-weight: ${({$fontWeight}) => $fontWeight === 'bold' ? 700 : 500};
    color: ${({$color, theme}) => $color === 'content' ? theme.text : theme.textDisable};
`;

const ImgWrapper = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background-color: ${({theme}) => theme.secondBgBlur};
    margin-right: 20px;
    overflow: hidden;

    svg:hover {
        color: ${({theme}) => theme.text};
    }
`

const AccountInfo = styled.div`
    width: 100%;
    height: 190px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.mainBgBlur};
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    box-sizing: border-box;
`;

const ButtonsSelection = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
`;

const LogoutBtn = styled.button<{$isPressed: boolean}>`
    width: 100%;
    height: 40px;
    border: ${({theme, $isPressed}) => $isPressed ? '1px solid transparent' : '1px solid' + theme.text};
    border-radius: 10px;
    font-size: 1.8rem;
    font-weight: 600;
    font-family: 'Rubik';
    cursor: pointer;
    position: relative;
    transition: 0.3s ease all;

    span {
        position: relative;
        z-index: 1
    }

    &:hover {
        transform: scale(1.02);
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 38px;
        border-radius: 10px;
        transition: ${({$isPressed}) => $isPressed ? '1s' : '0.4s'}  linear all;
        width: ${({$isPressed}) => $isPressed ? '100%' : 0};
        background-color: ${({theme}) => theme.errorColor};
        z-index: 0;
    }
`;

const renderMonth = (regDate: Date) => {
    switch (regDate.getMonth()) {
        case 0:
            return 'января';
        case 1:
            return 'февраля';
        case 2:
            return 'марта';
        case 3:
            return 'апреля';
        case 4:
            return 'мая';
        case 5:
            return 'июня';
        case 6:
            return 'июля';
        case 7:
            return 'августа';
        case 8:
            return 'сентября';
        case 9:
            return 'октября';
        case 10:
            return 'ноября';
        case 11:
            return 'декабря';
    }
}

const FileInput = styled.input`
    position: absolute;
    opacity: 0;
    pointer-events: none;

    & + label {
        cursor: pointer;
        font-size: 2.2rem;
        width: 100%;
        height: 200px;
        font-weight: 700;
        background-color: ${({theme}) => theme.mainBgBlur};
        margin-bottom: 10px;
        border-radius: 10px;
        border: 1px solid ${({theme}) => theme.border};
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s ease all;

        &:hover {
            font-size: 2.3rem;
            color: ${({theme}) => theme.accent};
        }
    }
`;

const FileImgWrapper = styled.div`
    width: 100%;
    height: 200px;
    padding: 20px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.mainBgBlur};
    border: 1px solid ${({theme}) => theme.border};
    box-sizing: border-box;
    display: flex;
    img {
        height: 160px;
        width: 160px;
        border-radius: 7px;
        margin-right: 15px;
        object-fit: cover;
    }

    span {
        font-size: 1.6rem;
        font-weight: 600;
    }

    div {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        flex: 1 0;
        button {
            background-color: ${({theme}) => theme.errorColor};
            
            &:hover {
                background-color: ${({theme}) => theme.errorHover};
            }
        }
    }
`
const AccountDataBar: FC = () => {
    const dispatch = useAppDispatch();
    const {showUserData, data: {username, email, reg_date, user_img}} = useAppSelector(state => state.user);

    const regDate = new Date(reg_date);
    const navigate = useNavigate();

    const serverUrl = 'https://music-server-production-5ca2.up.railway.app';

    const [isPressed, setIsPressed] = useState(false);
    const [startDate, setStartDate] = useState<null | number>(null);
    const [changePhoto, setChangePhoto] = useState(false);

    const onDown = () => {
        setIsPressed(true);
        setStartDate(new Date().getTime());
    }

    const onUp = () => {
        setIsPressed(false);
        const dateOnUp = new Date().getTime();
        if (startDate) {
            if (dateOnUp - startDate >= 1000) {
                // eslint-disable-next-line no-restricted-globals
                const answer = confirm('Вы точно хотите выйти из аккаунта?');
                if (answer) {
                    logout();
                    dispatch(logoutUser());
                    navigate('/auth');
                }
            }
        }
    }

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState('');
    const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const fileReader = new FileReader();
            fileReader.onloadend = () => void setPreview(fileReader.result as string);
            fileReader.readAsDataURL(selectedFile);
            console.log(file);
        }
    }

    const submitImg = async () => {
        const formData = new FormData();
        if (file) {
            formData.append('user_img', file);
            try {
                const response = await fetch(serverUrl + '/api/users/setuserphoto/', {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Token': localStorage.getItem('Token')!
                    }
                });
                const data = await response.json();
                data.user_img = serverUrl + data.user_img
                dispatch(setUserPhoto(data.user_img));
                setChangePhoto(false);

            } catch (error) {
                if (error) {
                    const err = error as Error;
                    console.log(err.message);
                }
            }
            
        }
    }

    const renderData = () => {
        if (changePhoto) {
            return (
                <form>
                    <FileInput onChange={handleChangeFileInput} id="user_img" name="user_img" type="file"/>
                    {!preview && <label htmlFor="user_img">Выберите файл</label>}
                    {preview && 
                        <FileImgWrapper>
                            <img src={preview} alt="Предпросмотр"/>
                            <div>
                                <span>Ваша фотография</span>
                                <Button type='accent' H={30} W={191} content={<label htmlFor="user_img">Изменить фото</label>} fontS={1.6} fontW={600}/>
                            </div>
                        </FileImgWrapper>
                    }
                    <ButtonsSelection>
                        <Button onClick={submitImg} type={file ? 'accent' : 'disable'} H={40} W={410} content='Отправить фото' fontS={1.8} fontW={600}/>
                        <Button onClick={() => setChangePhoto(false)} type="simple" H={40} W={410} content='Назад' fontS={1.8} fontW={600}/>
                    </ButtonsSelection>
                </form>
            )
        } else {
            return (
                <>

                    <AccountData>
                        <ImgWrapper>
                            {user_img ? <img width={'100%'} src={user_img} alt=""/>  : <UserIcon scale={50}/>}
                        </ImgWrapper>
                        <FlexColumn>
                            <TextSpan $fontSize="big" $fontWeight="bold" $color="content">{username}</TextSpan>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="disable">{email}</TextSpan>
                        </FlexColumn>
                    </AccountData>
                    <AccountInfo>
                        <div style={{margin: '10px 0 20px 0'}}>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="content" style={{marginRight: '10px'}}>Имя пользователя: </TextSpan>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="disable">{username}</TextSpan>
                        </div>
                        <div style={{marginBottom: '20px'}}>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="content" style={{marginRight: '10px'}}>Почта: </TextSpan>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="disable">{email}</TextSpan>
                        </div>
                        <div style={{marginBottom: '20px'}}>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="content" style={{marginRight: '10px'}}>День регистрации: </TextSpan>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="disable">{regDate.getDate()} {renderMonth(regDate)}</TextSpan>
                        </div>
                        <div style={{marginBottom: '20px'}}>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="content" style={{marginRight: '10px'}}>Год регистрации: </TextSpan>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="disable">{regDate.getFullYear()} год</TextSpan>
                        </div>
                        <div>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="content" style={{marginRight: '10px'}}>Время регистрации: </TextSpan>
                            <TextSpan $fontSize="small" $fontWeight="bold" $color="disable">{regDate.getHours()}:{regDate.getMinutes()}</TextSpan>
                        </div>
                    </AccountInfo>
                    <ButtonsSelection>
                        <Button onClick={() => setChangePhoto(true)} type="accent" H={40} W={410} content='Изменить фото' fontS={1.8} fontW={600}/>
                        <LogoutBtn $isPressed={isPressed} onMouseDown={onDown} onMouseUp={onUp}><span>Выйти из аккаунта</span></LogoutBtn>
                    </ButtonsSelection>
                </>
            )
        }
    }

    return (
        <AccountBar $isShow={showUserData}>
            <FlexRow>
                <TextSpan $fontSize="big" $fontWeight="bold" $color="content" >Аккаунт</TextSpan>
                <BackBtn onClick={() => dispatch(toggleShowUserData(false))}><Cross /></BackBtn>
            </FlexRow>
            {renderData()}
        </AccountBar>
    )
}

export default AccountDataBar;