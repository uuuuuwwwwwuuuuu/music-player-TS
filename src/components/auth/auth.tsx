import { ChangeEvent, FC, FormEvent, useEffect, useState, useRef } from 'react';
import './auth.scss';
import { FaUser } from "react-icons/fa";
import { PiSignInLight } from "react-icons/pi";

interface IFormData {
    username: string | null,
    password: string | null,
    email?: string | null
}

interface IValidationMessage {
    usernameInvalid: string | null,
    passwordInvalid: string | null,
}

const regUser = async (data) => {
    try {
        const res = await fetch('http://127.0.0.1:8000/api/users/register/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await res.json()
    } catch (err) {
        if (err) {
            const {message} = err as Error;
            console.log(message);
        }
    }
}

const authUser = async (data) => {
    try {
        const res = await fetch('http://127.0.0.1:8000/api/users/auth/', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await res.json()
    } catch (err) {
        if (err) {
            const {message} = err as Error;
            console.log(message);
        }
    }
}

const Auth: FC = () => {
    const [auth, setAuth] = useState<'reg' | 'auth' | null>(null);
    const [content, setContent] = useState<JSX.Element | null>(null);

    const initialFormState = {username: null, password: null, email: null}
    const [formData, setFormData] = useState<IFormData>(initialFormState);

    const [validationMessages, setValidationMessages] = useState<IValidationMessage>(
        {usernameInvalid: null, passwordInvalid: null}
    );

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const prevAuth = useRef<'reg' | 'auth' | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (auth === 'reg') {
            if (name === 'username') {
                if (value && (value.length <= 4 || value.length >= 255)) {
                    setValidationMessages(prevState => ({
                        ...prevState,
                        usernameInvalid: 'Ваше имя должно быть длиннее 4-ти символов и короче 255-ти символов'
                    }))
                    setFormData(prevState => ({
                        ...prevState,
                        username: null
                    }))
                } else {
                    setValidationMessages(prevState => ({
                        ...prevState,
                        usernameInvalid: null
                    }))
                    setFormData(prevState => ({
                        ...prevState,
                        username: value
                    }))
                }
            } else if (name === 'password') {
                if (value && (value.length <= 6 || value.length >= 20 || !/\d/g.test(value))) {
                    setValidationMessages(prevState => ({
                        ...prevState,
                        passwordInvalid: 'Ваш пароль должен быть длиннее 6-ти символов, короче 20-ти символов и содержать хотя бы 1 число'
                    }))
                    setFormData(prevState => ({
                        ...prevState,
                        password: null
                    }))
                } else {
                    setValidationMessages(prevState => ({
                        ...prevState,
                        passwordInvalid: null
                    }));
                    setFormData(prevState => ({
                        ...prevState,
                        password: value
                    }))
                }
            } else if (name === 'email') {
                setFormData(prevState => ({
                    ...prevState,
                    email: value
                }))
            }
        } else {
            if (name === 'username') {
                setFormData(prevState => ({
                    ...prevState,
                    username: value
                }))
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    password: value
                }))
            }
        }
    }

    const handleSubmitReg = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        let isValid = true;

        for(let value of Object.values(formData)) {
            if (!value) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            setIsLoading(true)
            regUser(formData).then(data => setResponse(data.data || data.error || 'Произошла непредвиденная ошибка, обратитесь в поддержку'))
            setIsLoading(false)
        } else {
            setResponse('Вы заполнили не все поля или заполнили их не верно')
        }
        setFormData(initialFormState)
        form.reset();
    }

    const handleSubmitAuth = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;

        setIsLoading(true);

        authUser(formData).then(data => {
            if (!data.token) {
                data.error && setResponse(data.error)
            } else {
                localStorage.setItem('Token', data.token)
                window.location.reload();
            }
        })

        setIsLoading(false);

        setFormData(initialFormState)
        form.reset();
    }

    useEffect(() => {
        if (auth) {
            setContent(null);
            const {usernameInvalid, passwordInvalid} = validationMessages
                setContent(
                    <>
                        <div className='inputs_wrapper' style={{animation: 'reg-auth-data-fade-in 1s ease-out'}}>
                            <div className='input_field'>
                                <label htmlFor="username">Имя пользователя</label>
                                <input onChange={handleChange} type="text" id='username' name='username' required/>
                                {usernameInvalid && <span className='validation_error'>{usernameInvalid}</span>}
                            </div>
                            <div className='input_field'>
                                <label htmlFor="password">Пароль</label>
                                <input onChange={handleChange} type="password" id='password' name='password' required/>
                                {passwordInvalid && <span className='validation_error'>{passwordInvalid}</span>}
                            </div>
                            {auth === 'reg' && <div className='input_field'>
                                <label htmlFor="email">Электронная почта</label>
                                <input onChange={handleChange} type="email" id='email' name='email' required/>
                            </div>}
                        </div>
                        <span className='auth_info' style={{animation: 'reg-auth-data-fade-in 1s ease-out'}}>
                            Приложение не является полной версией и передаваемые данные служат исключительно для демонстрации возможности реализации регистрации и авторизации пользователей. 
                            Убедительно рекомендую <b>не использовать настоящий email адрес</b>
                        </span>
                        {prevAuth.current === auth && response && <span 
                            className='validation_error' 
                            style={{animation: 'reg-auth-data-fade-in 1s ease-out'}}>
                                {response}
                            </span>}
                        <button className='submit_auth_btn' 
                            type='submit'>
                            <span>{isLoading ? <div className="loader"></div> : 'ОТПРАВИТЬ'}</span>
                        </button>
                    </>
                );
                prevAuth.current = auth
        } else {
            setContent(null);
        }
    }, [auth, validationMessages, response, isLoading]);

    const regClassName = 
        auth === 'reg' ? 'active choice_action' : 
        auth === 'auth' ? 'disable_action choice_action' : 'choice_action';
    const signInClassName = 
        auth === 'auth' ? 'active choice_action' : 
        auth === 'reg' ? 'disable_action choice_action' : 'choice_action'

    
    return (
        <div className='auth'>
            <div className='auth_title'>BROOKLING</div>
            <div className='auth_wrapper'>
                <form onSubmit={handleSubmitReg} className={regClassName} onClick={() => auth !== 'reg' && setAuth('reg')}>
                    <span className='reg_title choice_action_title'>{auth !== 'auth' ? 'Зарегистрироваться' : <FaUser />}</span>
                    {auth === 'reg' && content}
                </form>
                <form onSubmit={handleSubmitAuth} className={signInClassName} onClick={() => auth !== 'auth' && setAuth('auth')}>
                    <span className='choice_action_title'>{auth !== 'reg' ? 'Войти' : <PiSignInLight className='sign_in_logo'/>}</span>
                    {auth === 'auth' && content}
                </form>
            </div>
        </div>
    );
}

export default Auth;