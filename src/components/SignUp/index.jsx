import { useEffect, useState } from 'react';
import styles from './SignUp.module.scss';
import { capitalizeFirstLetter, checkpass } from './../../libs/utils';
import { sendEmail, httpPOST } from '../../libs/http';

import { TiMail, TiKeyOutline, TiUserOutline, TiUser } from "react-icons/ti";



const SignUp = ({ setForm }) => {
    const [message, setMessage] = useState('');

    const initUser = {
        name: '',
        surname: '',
        email: '',
        password: '',
        photo: 'https://i.ibb.co/rZ1HGTB/user.png'
    }

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRpassword] = useState('');

    const [activeBtn, setActiveBtn] = useState(true)

    const [newUser, setNewUser] = useState(initUser);

    useEffect(() => {
        setNewUser({
            name: capitalizeFirstLetter(name),
            surname: capitalizeFirstLetter(surname),
            email: email.toLocaleLowerCase(),
            password: password,
            photo: 'https://i.ibb.co/rZ1HGTB/user.png',
            friends: [],
            bio: {
                alias: '', 
                job: '',
                sex: '',
                about: '',
                cover: 'https://i.ibb.co/GH24KJP/default-Cover.jpg',
                allPhotos: []
            },
            friendreq: [],
            friendrec: [],
            notify: [],
            messages: {},
            confirmed: false,
        })
    }, [name, surname, email, password])

    const registration = (e) => {
        e.preventDefault();
        setActiveBtn(false);
        if (checkpass(password, rPassword)) {
            httpPOST('/users', newUser)
                .then((res) => {
                    sendEmail(email, res, name, '/verify/key=');
                    setName('');
                    setSurname('');
                    setEmail('');
                    setPassword('');
                    setRpassword('');
                    setActiveBtn(true);
                    // setNewUserModal('verify')
                })
                .catch((error) => {
                    console.error('error:', error);
                    ;
                });
        } else {
            setActiveBtn(true);
            setMessage('le password non coincidono!!!')
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1>Registrati</h1>
            </div>
            <div className={styles.formWrapper}>
                <form onSubmit={(e) => registration(e)}>
                    <div className={styles.inputWrapper}>
                        <span><TiUserOutline /></span>
                        <input value={name} onChange={(e) => { setName(e.target.value); setMessage('') }} type='text' id='name' name='name' placeholder='nome' required />
                    </div>
                    <div className={styles.inputWrapper}>
                        <span><TiUser /></span>
                        <input value={surname} onChange={(e) => { setSurname(e.target.value); setMessage('') }} type='text' id='surname' name='surname' placeholder='cognome' required />
                    </div>
                    <div className={styles.inputWrapper}>
                        <span><TiMail /></span>
                        <input value={email} onChange={(e) => { setEmail(e.target.value); setMessage('') }} type='email' id='email' name='email' placeholder='e-mail' required />
                    </div>
                    <div className={styles.inputWrapper}>
                        <span><TiKeyOutline /></span>
                        <input value={password} onChange={(e) => { setPassword(e.target.value); setMessage('') }} type='password' id='password' name='password' placeholder='password' required />
                    </div>
                    <div className={styles.inputWrapper}>
                        <span><TiKeyOutline /></span>
                        <input value={rPassword} onChange={(e) => { setRpassword(e.target.value); setMessage('') }} type='password' id='r-password' name='r-password' placeholder='ripeti password' required />
                    </div>
                    <p className={styles.forgot}>
                        <label>
                            <input type='checkbox' value={true} required />
                            Accetto i termini
                        </label>
                    </p>
                    <p>{message}</p>
                    <button disabled={!activeBtn ? true : false}>Registrati</button>
                </form>
                <p className={styles.register}>Hai già un account? <span onClick={() => setForm('login')} >Accedi!</span></p>
            </div>
        </div>
    )
}

export default SignUp;