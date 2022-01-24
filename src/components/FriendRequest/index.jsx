import { useSelector } from 'react-redux';
import styles from './FriendRequest.module.scss';
import FriendRequestRow from './../FriendRequestRow';

const FriendsList = () => {
    const user = useSelector(state => state.login.value);
    return (
        <div className={styles.main}>
            <h4>Richieste D'amicizia</h4>
            {user.friendrec.map(friend => <FriendRequestRow key={friend.id} friendContent={friend} />)}
        </div>
    )
}



export default FriendsList;