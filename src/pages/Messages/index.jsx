import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './../../libs/loginSlice';
import { useEffect, useState } from 'react';
import { httpPOST } from '../../libs/http';
import styles from './Messages.module.scss';
import { TiTrash } from "react-icons/ti";

import PagesHeader from '../../components/PagesHeader';
import MessagePreview from '../../components/MessagePreview';

const Messages = () => {
    const [toRemove, setToRemove] = useState([])
    const user = useSelector(state => state.login.value);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    const removeList = (e, item) => {
        e.target.checked ?
            setToRemove([...toRemove, item]) :
            setToRemove(toRemove.filter(el => el !== item));
    }

    const sendToRemove = () => {

        httpPOST('/deletemessages', {
            userId: user.id,
            chatId: toRemove
        }).then(data => {
            httpPOST('/checksession', {
                userId: user.id,
                login_time: user.login_time,
                user_token: user.user_token,
                logged: user.logged,
                checkSession: user.checkSession
            }).then(data => {
                setToRemove([]);
                dispatch(setLogin(data))
            })
        })
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