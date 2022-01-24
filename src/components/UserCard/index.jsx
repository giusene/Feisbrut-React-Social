import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.scss';
import { TiUserAdd } from "react-icons/ti";
import { TiTick } from "react-icons/ti";
import { TiMail } from "react-icons/ti";
import { httpPOST } from '../../libs/http';



const UserCard = ({ user, btn }) => {
    const profile = useSelector(state => state.login.value);

    const friendShipREQ = (friendId, userId) => {

        httpPOST('/sendfriendrequest', { myId: userId, friendId: friendId })
            .then(data => console.log(data))
    }


    return (
        <div className={styles.main}>
            <Link to={'/profile'} state={user.id}><div className={styles.userImg} style={{ backgroundImage: `url(${user.photo})` }}>
                <div className={styles.status}></div>
            </div></Link>
            <div className={styles.userName}><Link to={'/profile'} state={user.id}><h3>{user.name} {user.surname}</h3></Link></div>
            {/* <div className={styles.userJob}><p>{user.bio.job}</p></div> */}
            <div className={styles.buttons}>
                {btn && user.id !== profile.id &&
                    <button onClick={() => friendShipREQ(user.id, profile.id)} disabled={
                        profile.friendreq.filter((item) => item.id === user.id).length > 0 ? true :
                            profile.friends.filter((item) => item.id === user.id).length > 0 ? true : false}>{
                            profile.friendreq.filter((item) => item.id === user.id).length > 0 ? <TiUserAdd /> :
                                profile.friends.filter((item) => item.id === user.id).length > 0 ? <TiTick /> : <TiUserAdd />
                        }</button>}
                {user.id !== profile.id && <Link to={'/discussion'} state={{ user: user }}><button><TiMail /></button></Link>}
            </div>
        </div>
    )
}

export default UserCard 