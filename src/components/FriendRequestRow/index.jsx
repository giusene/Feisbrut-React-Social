import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './FriendRequestRow.module.scss';
import { httpPOST } from '../../libs/http';

import { TiTick, TiTimes } from "react-icons/ti";
import { useState } from 'react';

const FriendRequestRow = ({ friendContent }) => {
    const user = useSelector(state => state.login.value);

    const [disabled, setDisabled] = useState(false)

    const accept = (myId, friendId) => {
        setDisabled(true)
        httpPOST('/confirmfriendrequest', {
            myId: myId,
            friendId: friendId,
            confirmed: true
        })
            .then(data => {
                // AGGIORNARE PROFILO
            })
    }

    const decline = (myId, friendId) => {
        setDisabled(true)
        httpPOST('/confirmfriendrequest', {
            myId: myId,
            friendId: friendId,
            confirmed: true
        })
            .then(data => {
                // AGGIORNARE PROFILO
            })
    }


    return (
        <div className={styles.main}>
            <Link to={'/profile'} state={friendContent.id}>
                <div className={styles.userImg} style={{ backgroundImage: `url(${friendContent.photo})` }}></div>
            </Link>
            <Link to={'/profile'} state={friendContent.id}>
                <div className={styles.userName}>{friendContent.name} {friendContent.surname}</div>
            </Link>
            <button disabled={disabled} onClick={() => accept(user.id, friendContent.id)}><TiTick /></button>
            <button disabled={disabled} onClick={() => decline(user.id, friendContent.id)}><TiTimes /></button>
        </div>

    )
}

export default FriendRequestRow