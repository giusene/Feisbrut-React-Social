import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLogin } from './../../libs/loginSlice';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.scss';
import { TiUserAdd, TiTick, TiMail } from "react-icons/ti";
import { httpPOST } from '../../libs/http';



const UserCard = ({ user, btn, status }) => {
    const profile = useSelector(state => state.login.value);
    const [disabled, setDisabled] = useState(false);
    // const dispatch = useDispatch();

    const friendShipREQ = (friendId, userId) => {
        setDisabled(true);
        httpPOST('/sendfriendrequest', { myId: userId, friendId: friendId })
        // .then(data => {
            // httpPOST('/checksession', {
            //     userId: profile.id,
            //     login_time: profile.login_time,
            //     user_token: profile.user_token,
            //     logged: profile.logged,
            //     checkSession: profile.checkSession
            //   }).then(data => {
            //       dispatch(setLogin(data))

            //       window.localStorage.setItem('feisbrut', JSON.stringify({ 
            //         userId: data.id,
            //         login_time: data.login_time,
            //         user_token: data.user_token,
            //         checkSession: data.checkSession,
            //         logged: data.logged 
            //     }))
                  
            //     })
        // })
    }

    useEffect(() => {
        profile.friendreq.filter((item) => item.id === user.id).length > 0 ? setDisabled(true) :
           profile.friends.filter((item) => item.id === user.id).length > 0 ? setDisabled(true) : setDisabled(false)
    }, [profile.friendreq, profile.friends, user.id])

    return (
        <div className={styles.main}>
            <Link to={'/Feisbrut-React-Social/profile'} state={user.id}><div className={styles.userImg} style={{ backgroundImage: `url(${user.photo})` }}>
            { status &&
                <> {
                (Date.now() / 60000) - (user.login_time / 60000) <= 1 ? <div className={styles.green}></div> :
                (Date.now() / 60000) - (user.login_time / 60000) > 1 && (Date.now() / 60000) - (user.login_time / 60000) < 5 ? <div className={styles.yellow}></div> :
                <div className={styles.gray}></div>
                }
                </>
            }
                
            </div></Link>
            <div className={styles.userName}><Link to={'/Feisbrut-React-Social/profile'} state={user.id}><h3>{user.name} {user.surname}</h3></Link></div>
            <div className={styles.userJob}><p>{user.bio.job}</p></div>
            <div className={styles.buttons}>
                {btn && user.id !== profile.id &&
                    <button onClick={() => friendShipREQ(user.id, profile.id)}  disabled={disabled}>{
                            profile.friendreq.filter((item) => item.id === user.id).length > 0 ? <TiUserAdd /> :
                                profile.friends.filter((item) => item.id === user.id).length > 0 ? <TiTick /> : <TiUserAdd />
                        }</button>}
                {user.id !== profile.id && <Link to={'/Feisbrut-React-Social/discussion'} state={{ user: user }}><button><TiMail /></button></Link>}
            </div>
        </div>
    )
}

export default UserCard 