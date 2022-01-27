import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLogin } from './../../libs/loginSlice';
import { Link } from 'react-router-dom';
import { httpPOST } from '../../libs/http';
import styles from './FriendRequestRow.module.scss';

import { TiTick, TiTimes } from "react-icons/ti";
import { useState } from 'react';


const FriendRequestRow = ({ friendContent }) => {
    const user = useSelector(state => state.login.value);
    // const dispatch = useDispatch();

    const [disabled, setDisabled] = useState(false)

    const accept = (myId, friendId) => {
        setDisabled(true)
        httpPOST('/confirmfriendrequest', {
            myId: myId,
            friendId: friendId,
            confirmed: true
        })
        // .then(data => {
        //     httpPOST('/checksession', {
        //         userId: user.id,
        //         login_time: user.login_time,
        //         user_token: user.user_token,
        //         logged: user.logged,
        //         checkSession: user.checkSession
        //     }).then(data => {
        //         dispatch(setLogin(data));

        //         window.localStorage.setItem('feisbrut', JSON.stringify({
        //             userId: data.id,
        //             login_time: data.login_time,
        //             user_token: data.user_token,
        //             checkSession: data.checkSession,
        //             logged: data.logged
        //         }))

        //     })
        // })
    }

    const decline = (myId, friendId) => {
        setDisabled(true)
        httpPOST('/confirmfriendrequest', {
            myId: myId,
            friendId: friendId,
            confirmed: true
        })
            // .then(data => {
            //     httpPOST('/checksession', {
            //         userId: user.id,
            //         login_time: user.login_time,
            //         user_token: user.user_token,
            //         logged: user.logged,
            //         checkSession: user.checkSession
            //     }).then(data => {
            //         dispatch(setLogin(data));

            //         window.localStorage.setItem('feisbrut', JSON.stringify({ 
            //             userId: data.id,
            //             login_time: data.login_time,
            //             user_token: data.user_token,
            //             checkSession: data.checkSession,
            //             logged: data.logged 
            //         }))

            //     })
            // })
    }


    return (
        <div className={styles.main}>
            <Link to={'/profile'} state={friendContent.id}>
                <div className={styles.userImg} style={{ backgroundImage: `url(${friendContent.photo})` }}></div>
            </Link>
            <Link className={styles.linkName} to={'/profile'} state={friendContent.id}>
                <div className={styles.userName}>{friendContent.name} {friendContent.surname}</div>
            </Link>
            <button disabled={disabled} onClick={() => accept(user.id, friendContent.id)}><TiTick /></button>
            <button disabled={disabled} onClick={() => decline(user.id, friendContent.id)}><TiTimes /></button>
        </div>

    )
}

export default FriendRequestRow