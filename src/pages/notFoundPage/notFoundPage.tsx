import { FC } from "react";
import styled from "styled-components";
import Button from "../../components/buttons/buttons";
import { useNavigate } from "react-router-dom";

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
`;

const NotFoundPage: FC = () => {
    const navigate = useNavigate()

    return (
        <Main>
            <Info>Страница не найдена</Info>
            <ButtonsWrapper>
                <Button type="accent" W={250} H={40} content="Перейти на главную" fontS={1.8} fontW={600} onClick={navigate('/home')}/>
            </ButtonsWrapper>
        </Main>
    )
}

export default NotFoundPage;