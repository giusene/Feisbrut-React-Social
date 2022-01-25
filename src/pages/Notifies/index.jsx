
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './../../libs/loginSlice';
import Notify from '../../components/Notify';
import PagesHeader from '../../components/PagesHeader';
import styles from './Notifies.module.scss';
import { httpPOST } from '../../libs/http';
import { TiTrash } from "react-icons/ti";

const Notifies = () => {
    const [toRemove, setToRemove] = useState([]);
    const user = useSelector(state => state.login.value);
    const dispatch = useDispatch();

    let readItems = useMemo(() =>
        [], [])

    user.notify.forEach((item) => {
        !item.read && (
            readItems = [...readItems, item.notify_id]
        )
    })

    // let readItems = useMemo(() =>
    //     user.notify.forEach((item) => {
    //         !item.read && (
    //             readItems = [...readItems, item.notify_id]
    //         )
    //     }), [user.notify])

    const sendToRemove = () => {
        httpPOST('/notificationmanager', {
            type: "delete",
            userId: user.id,
            notification_id: toRemove
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

    const sendToRead = useCallback(
        () => {
            httpPOST('/notificationmanager', {
                type: "patch",
                userId: user.id,
                notification_id: readItems
            }).then(data => {
                httpPOST('/checksession', {
                    userId: user.id,
                    login_time: user.login_time,
                    user_token: user.user_token,
                    logged: user.logged,
                    checkSession: user.checkSession
                }).then(data => {
                    console.log(data);
                    dispatch(setLogin(data))
                })
            })
        }, [user.id, readItems, dispatch, user.checkSession, user.logged, user.login_time, user.user_token])

    const removeList = (e, item) => {
        e.target.checked ?
            setToRemove([...toRemove, item]) :
            setToRemove(toRemove.filter(el => el !== item));
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        readItems.length > 0 && sendToRead();
    }, [readItems.length, sendToRead])

    return (
        <div className={styles.main}>
            <PagesHeader title={'Notifiche'} />
            <div className={toRemove.length > 0 ? `${styles.contentHeader} ${styles.active}` : styles.contentHeader}>
                <button onClick={() => sendToRemove()} disabled={toRemove.length > 0 ? false : true}><TiTrash /></button> {
                    toRemove.length > 0 &&
                    <p>Elimina {toRemove.length} selezionati</p>
                }
            </div>
            <ul>{user.notify.length > 0 ?
                <>
                {[...user.notify].reverse().map((notify) =>
                    <Notify key={notify.notify_id} removelist={removeList} notify={notify} />
                )}
            </> :
            <p>non ci sono notifiche</p>
            }
            </ul>
        </div>
    )
}

export default Notifies;