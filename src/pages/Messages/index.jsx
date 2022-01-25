import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styles from './Messages.module.scss';
import { TiTrash } from "react-icons/ti";

import PagesHeader from '../../components/PagesHeader';
import MessagePreview from '../../components/MessagePreview';

const Messages = () => {
    const [toRemove, setToRemove] = useState([])
    const user = useSelector(state => state.login.value);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const removeList = (e, item) => {
        e.target.checked ?
            setToRemove([...toRemove, item]) :
            setToRemove(toRemove.filter(el => el !== item));
    }

    const sendToRemove = () => {
        console.log(toRemove)
    }

    return (
        <div className={styles.main}>
            <PagesHeader title={'Messaggi'} />
            <div className={toRemove.length > 0 ? `${styles.contentHeader} ${styles.active}` : styles.contentHeader }>
                <button onClick={() => sendToRemove()} disabled={toRemove.length > 0 ? false : true}><TiTrash /></button> {
                    toRemove.length > 0 &&
                    <p>Elimina {toRemove.length} selezionati</p>
                }
            </div>
            <div className={styles.content}>
                {Object.keys(user.messages).length > 0 ? 
                <>
                    {Object.keys(user.messages).reverse().map((message, index) => (
                    <MessagePreview messageId={message} removeList={removeList} key={index} message={user.messages[message]} />
                ))} 
                </> :
                <p>non ci sono messaggi</p>
                }
            </div>
        </div>
    )
}

export default Messages;