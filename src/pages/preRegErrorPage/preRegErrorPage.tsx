import { FC } from "react";
import { FaUserAltSlash } from "react-icons/fa";
import Button from "../../components/buttons/buttons";

import './preRegErrorPage.scss';

const PreRegErrorPage: FC = () => {
    return (
        <div className="auth_error_page">
            <main>
                <div>
                    <span>Для прехода на данный ресурс необходимо авторизоваться</span>
                </div>
                <FaUserAltSlash/>
                <Button type="accent" isLink path="/auth" content="Перейти к авторизации" W={300} H={50} fontS={1.8} fontW={700}/>
            </main>
        </div>
    )
}

export default PreRegErrorPage;