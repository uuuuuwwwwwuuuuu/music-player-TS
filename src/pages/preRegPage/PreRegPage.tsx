import { FC } from "react";
import './PreRegPage.scss';
import Button from "../../components/buttons/buttons";

const PreRegPage = () => {
    return (
        <div className="pre_reg_main">
            <header>
                <span>BROOKLYN</span>
            </header>
            <main>
                <div className="main_content">
                    <div>
                        <h1>Добро пожаловать в <span>BROOKLYN</span></h1>
                        <p>
                            Данное приложения является “пет-проектом”, написанное с целью прохождения собеседования и демострации возможностей разработчика. <br />
                            Приложение имеет крайне ограниченную базу данных, созданную исключительно в целях демонстрации
                            Реализован функционал регистрации и авторизации пользователей (следует обратить внимание на то, что приложение использует пользовательские данные исключительно с целью обеспечения его корректной работы). 
                        </p>
                        <p id="warning">
                            <span>Убедительно не рекомендую использовать свои настоящие данные для регистрации!!!</span><br />
                            В приложении реализована не сложная back-end логика, однако никакой защиты данных кроме шифровки пароля на стороне сервера <span>НЕТ</span> (так как разработчик позиционирует себя как front-end разработчик)
                        </p>
                        <span>Допиши инфу о самом сайте</span>
                    </div>
                    <div className="action_links">
                        <Button type="accent" isLink W={300} H={50} fontS={1.8} fontW={700} content='Перейти к авторизации' path="/auth"/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PreRegPage;