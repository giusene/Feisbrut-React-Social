
import { useSelector } from 'react-redux';
import styles from './FriendsList.module.scss';
import FriendRow from './../FriendRow';

const FriendsList = () => {
    const user = useSelector(state => state.login.value);

    return (
        <div className={styles.main}>
            <h4>Amici</h4>
            {user.friends.map(friend => <FriendRow key={friend.id} friendContent={friend} />)}
        </div>
    )
}



export default FriendsList;