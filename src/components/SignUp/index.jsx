import { useEffect, useState } from 'react';
import styles from './SignUp.module.scss';
import { capitalizeFirstLetter } from './../../libs/utils';
import { httpPOST } from '../../libs/http';

import { TiUserOutline, TiUser } from "react-icons/ti";



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
    

    const [activeBtn, setActiveBtn] = useState(true)

    const [newUser, setNewUser] = useState(initUser);

    useEffect(() => {
        setNewUser({
            name: capitalizeFirstLetter(name),
            surname: capitalizeFirstLetter(surname),
            email: name.toLocaleLowerCase() + '@' + name.toLocaleLowerCase(),
            password: '1234',
            photo: 'https://i.ibb.co/rZ1HGTB/user.png',
            friends: [],
            bio: {
                alias: '', 
                job: '',
                sex: '',
                about: 'È universalmente riconosciuto che un lettore che osserva il layout di una pagina viene distratto dal contenuto testuale se questo è leggibile. Lo scopo dell’utilizzo del Lorem Ipsum è che offre una normale distribuzione delle lettere (al contrario di quanto avviene se si utilizzano brevi frasi ripetute, ad esempio “testo qui”), apparendo come un normale blocco di testo leggibile. Molti software di impaginazione e di web design utilizzano Lorem Ipsum come testo modello. Molte versioni del testo sono state prodotte negli anni, a volte casualmente, a volte di proposito (ad esempio inserendo passaggi ironici).',
                cover: 'https://i.ibb.co/GH24KJP/default-Cover.jpg',
                allPhotos: []
            },
            friendreq: [],
            friendrec: [],
            notify: [],
            messages: {},
            confirmed: true,
        })
    }, [name, surname])

    const registration = (e) => {
        e.preventDefault();
        setActiveBtn(false);
        httpPOST('/users', newUser)
                .then((res) => { 
                    setName('');
                    setSurname('');
                    setActiveBtn(true);
                    setMessage(res.response)
                })
                .catch((error) => {
                    console.error('error:', error);
                    ;
                });
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
                    
                    
            
                    <p className={styles.message}>{message}</p>
                    <button disabled={!activeBtn ? true : false}>Registrati</button>
                </form>
                <p className={styles.register}>Hai già un account? <span onClick={() => setForm('login')} >Accedi!</span></p>
            </div>
        </div>
    )
}

export default SignUp;