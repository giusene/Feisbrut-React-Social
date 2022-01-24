import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './People.module.scss';
import UserCard from '../../components/UserCard';
import PagesHeader from '../../components/PagesHeader';
import { httpPOST } from '../../libs/http';

import { TiZoomOutline, TiMediaPlay } from "react-icons/ti";


const People = () => {
    const [input, setInput] = useState('');
    const [peopleList, setPeopleList] = useState([]);
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const user = useSelector(state => state.login.value);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const searchFunc = (e) => {
        e.preventDefault();
        
        setSearchQuery(input)
        setInput('');
        httpPOST('/searchbar', {
            author_id: user.id,
            text: input
        }).then(data => {
            if (data.response === 'nessun utente trovato') {
                setMessage('Nessun utente trovato');
                console.log(data.response)
            } else {
                setPeopleList(data);
                console.log(data)
                setMessage('');
            }
        })
    }

    return (
        <div className={styles.main}>
            <PagesHeader title={'Cerca Persone'} />
            <div className={styles.contentHeader}>
                <form onSubmit={(e) => searchFunc(e)}>
                    <div className={styles.inputWrapper}>
                        <span><TiZoomOutline /></span>
                        <input value={input} onChange={(e) => setInput(e.target.value)} type='text' id='search' name='search' placeholder='cerca per nome o cognome' required />
                        <button><TiMediaPlay /></button>
                    </div>
                </form>
                {searchQuery &&
                    <p className={styles.query}>risultati per: <span>{searchQuery}</span></p>
                }
            </div>
            <div className={styles.content}>
            {message}
                {peopleList.map(friend => <UserCard key={friend.id} user={friend} btn />)}
            </div>
        </div>
    )
}

export default People;