import { ChangeEvent, FC, FormEvent, useEffect, useState, useRef } from 'react';
import './auth.scss';
import Button from '../../components/buttons/buttons';
import { LuInfo } from "react-icons/lu";
import { FaTelegramPlane } from 'react-icons/fa';
import { Input } from '../../components/inputFields/inputFields';

interface IFormData {
    username: string | null,
    password: string | null,
    email: string | null
}

interface IValidationMessage {
    usernameInvalid: string | null,
    passwordInvalid: string | null,
    emailInvalid: string | null
}

enum Colors {
    success = '#4EBA3C',
    error = '#C84141'
}

const Auth: FC = () => {
    const [auth, setAuth] = useState<'reg' | 'auth'>('reg');
    const [content, setContent] = useState<JSX.Element | null>(null);

    const initialFormState = {username: null, password: null, email: ''}
    const [formData, setFormData] = useState<IFormData>(initialFormState);
    const [responseColor, setResponseColor] = useState<Colors>(Colors.success)

    const [validationMessages, setValidationMessages] = useState<IValidationMessage>(
        {usernameInvalid: 'Это поле не должно быть пустым', passwordInvalid: 'Это поле не должно быть пустым', emailInvalid: 'Это поле не должно быть пустым'}
    );

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const prevAuth = useRef<'reg' | 'auth' | null>(null)

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
                setResponse('Неполадки с сервером, попробуйте позже');
                setResponseColor(Colors.error);
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
                setResponse('Неполадки с сервером, попробуйте позже');
                setResponseColor(Colors.error);
            }
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setResponse(null);
        if (auth === 'reg') {
            switch (name) {
                case 'username':
                    if (value) {
                        if (value.length <= 4) {
                            setValidationMessages(prevState => ({
                                ...prevState,
                                usernameInvalid: 'Ваше имя должно быть длиннее 4-х символов'
                            }));
                        } else if (value.length >= 20) {
                            setValidationMessages(prevState => ({
                                ...prevState,
                                usernameInvalid: 'Ваше имя должно быть короче 20-ти символов'
                            }));
                        } else {
                            setValidationMessages(prevState => ({
                                ...prevState,
                                usernameInvalid: null
                            }))
                        }
                        setFormData(prevState => ({
                            ...prevState,
                            username: value
                        }));
                    } else {
                        setValidationMessages(prevState => ({
                            ...prevState,
                            usernameInvalid: 'Это поле не должно быть пустым'
                        }));
                    }
                    break;
                case 'password':
                    if (value) {
                        if (value.length <= 6) {
                            setValidationMessages(prevState => ({
                                ...prevState,
                                passwordInvalid: 'Ваш пароль должен быть длиннее 6-ти символов'
                            }))
                        } else if (value.length >= 25) {
                            setValidationMessages(prevState => ({
                                ...prevState,
                                passwordInvalid: 'Ваш пароль должен быть короче 25-ти символов'
                            }))
                        } else if (!/\d/g.test(value)) {
                            setValidationMessages(prevState => ({
                                ...prevState,
                                passwordInvalid: 'Ваш пароль должен иметь хотя бы 1 число'
                            }))
                        } else {
                            setValidationMessages(prevState => ({
                                ...prevState,
                                passwordInvalid: null
                            }))
                        }
                        setFormData(prevState => ({
                            ...prevState,
                            password: value
                        }));
                    } else {
                        setValidationMessages(prevState => ({
                            ...prevState,
                            passwordInvalid: 'Это поле не должно быть пустым'
                        }))
                    }
                    break;
                case 'email':
                    if (value) {
                        if (!/@/g.test(value)) {
                            setValidationMessages(prevState => ({
                                ...prevState,
                                emailInvalid: `В почте должен быть знак "@"`
                            }))
                        } else {
                            setValidationMessages(prevState => ({
                                ...prevState,
                                emailInvalid: null
                            }))
                        }
    
                        setFormData(prevState => ({
                            ...prevState,
                            email: value
                        }));
                    } else {
                        setValidationMessages(prevState => ({
                            ...prevState,
                            emailInvalid: 'Это поле не должно быть пустым'
                        }))
                    }
                    break;
            }
        } else {
            setValidationMessages(prevState => ({...prevState, emailInvalid: null}))
            switch (name) {
                case 'username':
                    if (value) {
                        setValidationMessages(prevState => ({
                            ...prevState,
                            usernameInvalid: null
                        }));
                        setFormData(prevState => ({
                            ...prevState,
                            username: value
                        }));
                    } else {
                        setValidationMessages(prevState => ({
                            ...prevState,
                            usernameInvalid: 'Это поле не должно быть пустым'
                        }));
                        setFormData(prevState => ({
                            ...prevState,
                            username: null
                        }));
                    }
                    break;
                case 'password':
                    if (value) {
                        setValidationMessages(prevState => ({
                            ...prevState,
                            passwordInvalid: null
                        }));
                        setFormData(prevState => ({
                            ...prevState,
                            password: value
                        }));
                    } else {
                        setValidationMessages(prevState => ({
                            ...prevState,
                            passwordInvalid: 'Это поле не должно быть пустым'
                        }));
                        setFormData(prevState => ({
                            ...prevState,
                            password: null
                        }));
                    }
                    break;
            }
        }
    }

    const handleSubmitReg = (e: FormEvent<HTMLFormElement>) => {
        setValidationMessages({usernameInvalid: 'Это поле не должно быть пустым', passwordInvalid: 'Это поле не должно быть пустым', emailInvalid: 'Это поле не должно быть пустым'})
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
            setIsLoading(true);
            regUser(formData).then(data => {
                if (data.data) {
                    setResponse(data.data);
                    setResponseColor(Colors.success);
                } else {
                    setResponse(data.error);
                    setResponseColor(Colors.error);
                }
            });
            setIsLoading(false)
        } else {
            setResponse('Вы заполнили не все поля или заполнили их не верно')
            setResponseColor(Colors.error)
        }
        setFormData(initialFormState)
        form.reset();
    }

    const handleSubmitAuth = (e: FormEvent<HTMLFormElement>) => {
        setValidationMessages({usernameInvalid: 'Это поле не должно быть пустым', passwordInvalid: 'Это поле не должно быть пустым', emailInvalid: 'Это поле не должно быть пустым'})
        e.preventDefault()
        const form = e.target as HTMLFormElement;

        setIsLoading(true);

        authUser(formData).then(data => {
            if (!data.token) {
                data.error && setResponse(data.error)
                setResponseColor(Colors.error)
            } else {
                localStorage.setItem('Token', data.token)
                window.location.reload();
            }
        })
        console.log('called');
        setIsLoading(false);

        setFormData(initialFormState)
        form.reset();
    }

    useEffect(() => {
        const {usernameInvalid, passwordInvalid, emailInvalid} = validationMessages;
            setContent(
                <form className='auth_reg_form' onSubmit={auth === 'reg' ? handleSubmitReg : handleSubmitAuth}>
                    <div className='auth_reg_title'>
                        {auth === 'auth' 
                            ? <span>Войти в <span className='brooklyn_word'>Brooklyn</span></span>
                            : <span>Зарегистрироваться в <span className='brooklyn_word'>Brooklyn</span></span>
                        }
                    </div>
                    <div className='inputs_wrapper'>
                        <div className='input_field'>
                            <div className='label_icon_wrapper'>
                                <label htmlFor="username">Имя пользователя</label>
                                <LuInfo className='auth_error_icon' style={{opacity: usernameInvalid ? 1 : 0}}/>
                            </div>
                            <Input 
                                H={40}
                                onChange={handleChange} 
                                type="text" 
                                id='username' 
                                name='username'
                                placeholder='Имя пользователя'
                                required/>
                            {usernameInvalid && <div className='validation_error'>{usernameInvalid}</div>}
                        </div>
                        <div className='input_field'>
                            <div className='label_icon_wrapper'>
                                <label htmlFor="password">Пароль</label>
                                <LuInfo className='auth_error_icon' style={{opacity: passwordInvalid ? 1 : 0}}/>
                            </div>
                            <Input 
                                H={40}
                                onChange={handleChange} 
                                type="password" 
                                id='password' 
                                name='password' 
                                placeholder='Пароль'
                                required />
                            {passwordInvalid && <div className='validation_error'>{passwordInvalid}</div>}
                            {auth === 'auth' && <div className='forgot_pass'><button type='button'>Забыли пароль?</button></div>}
                        </div>
                        {auth === 'reg' 
                            ? <div className='input_field'>
                                <div className='label_icon_wrapper'>
                                    <label htmlFor="email">Адрес электронной почты</label>
                                    <LuInfo className='auth_error_icon' style={{opacity: emailInvalid ? 1 : 0}}/>
                                </div>
                                <Input 
                                    H={40}
                                    onChange={handleChange} 
                                    type="email" 
                                    id='email' 
                                    name='email' 
                                    placeholder='Электронная почта'
                                    required/>
                                {emailInvalid && <div className='validation_error'>{emailInvalid}</div>}
                            </div>
                            : <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Button style={{marginTop: '20px'}}
                                W={250} H={50}
                                content={<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px'}}>
                                    <FaTelegramPlane style={{width: '30px', height: '30px'}}/>
                                    <span>Войти через Telegram</span>
                                </div>}
                                type='alternative' fontS={1.5} fontW={600}/>
                            </div>}
                    </div>
                    <Button W={auth === 'reg' ? 250 : 180} H={50} 
                        type={usernameInvalid || passwordInvalid || (auth === 'reg' && emailInvalid) ? 'disable' : 'accent'} 
                        fontS={1.8} fontW={600} 
                        content={auth === 'reg' ? 'Зарегистрироваться' : 'Войти'} 
                        actionType={(!usernameInvalid && !passwordInvalid && (auth === 'reg' || !emailInvalid)) ? 'submit' : undefined} 
                        propClassList='submit_auth_btn'/>
                    {prevAuth.current === auth && response && <div 
                        className='response_message'
                        style={{animation: 'reg-auth-data-fade-in 1s ease-out', color: responseColor}}>
                            {response}
                        </div>}
                </form>
                
            );
            prevAuth.current = auth
    }, [auth, validationMessages, response, isLoading, responseColor]);
    return (
        <div className='auth'>
            <div className="auth_header">
                <span className='auth_title'>BROOKLING</span>
                <div>
                    <Button 
                        H={42} W={200}
                        type='simple' fontS={2} 
                        fontW={600} content='Регистрация' 
                        onClick={() => setAuth('reg')}
                        style={{marginRight: '20px'}}/>
                    <Button 
                        H={42} W={150}
                        type='accent' fontS={2}
                        fontW={600} content='Войти'
                        onClick={() => setAuth('auth')}/>
                </div>
            </div>
            <div className='auth_wrapper'>
                {content}
            </div>
        </div>
    );
}

export default Auth;