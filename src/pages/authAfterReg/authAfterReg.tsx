import { FC, MouseEventHandler } from "react";
import './authAfterReg.scss';
import styled from "styled-components";
import Button from "../../components/buttons/buttons";

const Main = styled.main`
    padding-top: 100px;
    background-color: '${({theme}) => theme.secondBg}';
    height: 100svh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Info = styled.span`
    font-size: 4rem;
    font-weight: 700;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    margin-top: 30px;

    button {
        &:not(:last-child) {
            margin-right: 20px;
        }
    }
`;

const AuthAfterReg: FC = () => {

    const logout = (e: MouseEventHandler<HTMLButtonElement>) => {
        try {
            fetch('http://127.0.0.1:8000/api/users/logout/', {
                method: 'GET',
                headers: {
                    'Token': JSON.stringify(localStorage.getItem('Token'))
                }
            })
        } catch (err) {
            if (err) {
                const error = err as Error;
                console.log(error.message);
            }
        }
        localStorage.removeItem('Token');
        window.location.reload();
    }

    return (
        <Main>
            <Info>Вы уже вошли в систему</Info>
            <ButtonsWrapper>
                <Button type="accent" W={300} H={50} content={'Выйти из аккаунта'} propClassList="logout_btn" fontS={1.8} fontW={700} onClick={logout}/>
                <Button type="accent"  W={300} H={50} content={'Вернуться на главную'} fontS={1.8} fontW={700} isLink path="/home"/>
            </ButtonsWrapper>
        </Main>
    )
}

export default AuthAfterReg;