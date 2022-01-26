import { useState } from 'react';
import styles from './LoginForm.module.scss';
import { useDispatch } from 'react-redux';
import { setLogin } from './../../libs/loginSlice';
import { httpPOST } from '../../libs/http';

import { TiMail, TiKeyOutline } from "react-icons/ti";


const LoginForm = ({setForm}) => {
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const loginFunc = (e) => {
        e.preventDefault();
        httpPOST('/login', input).then(data => {
            if (data.response) {
                setMessage(data.response)
            } else {
                dispatch(setLogin({ ...data[0], logged: true }))
            }
        }).catch(e => setMessage('Errore di connessione'))
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1>Entra</h1>
            </div>
            <div className={styles.formWrapper}>
                <form onSubmit={(e) => loginFunc(e)}>
                    <div className={styles.inputWrapper}>
                        <span><TiMail /></span>
                        <input value={input.email} onChange={(e) => {
                            setInput({ ...input, email: e.target.value });
                            setMessage('');
                        }} type='email' placeholder='E-mail' required />
                    </div>
                    <div className={styles.inputWrapper}>
                        <span><TiKeyOutline /></span>
                        <input value={input.password} onChange={(e) => {
                            setInput({ ...input, password: e.target.value });
                            setMessage('');
                        }} type='password' placeholder='Password' required />
                    </div>
                    <p className={styles.forgot}>Password dimenticata?</p>
                    {message !== '' ?
                        <p className={styles.message}>{message}</p>
                        : null
                    }
                    <button>Accedi</button>
                </form>
                <p className={styles.register}>Non hai un account? <span onClick={()=> setForm('registration')} >Registrati!</span></p>
            </div>
        </div>
    )
}

export default LoginForm;