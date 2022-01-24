import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './FriendRequestRow.module.scss';
import { httpPOST } from '../../libs/http';

import { TiTick, TiTimes} from "react-icons/ti";

const FriendRequestRow = ({friendContent}) => {
    const user = useSelector(state => state.login.value);

    const accept = (myId, friendId) => {
        
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
        <Link to={'/discussion'} state={{user: friendContent}}>
        <div className={styles.main}>
        richiesta d'amiciza
            <div className={styles.userImg} style={{ backgroundImage: `url(${friendContent.photo})` }}></div>
            <div className={styles.userName}>{friendContent.name} {friendContent.surname}</div>
            <div className={styles.userStatus}></div>
            <button onClick={() => accept(user.id, friendContent.id)}><TiTick /></button>
            <button onClick={() => decline(user.id, friendContent.id)}><TiTimes /></button>
        </div>
        </Link>
    )
}

export default FriendRequestRow