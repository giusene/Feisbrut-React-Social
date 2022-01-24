import { Link } from 'react-router-dom';
import styles from './FriendRow.module.scss';

const FriendRow = ({friendContent}) => {
    return (
        <Link to={'/discussion'} state={{user: friendContent}}>
        <div className={styles.main}>
            <div className={styles.userImg} style={{ backgroundImage: `url(${friendContent.photo})` }}></div>
            <div className={styles.userName}>{friendContent.name} {friendContent.surname}</div>
            <div className={styles.userStatus}></div>
        </div>
        </Link>
    )
}

export default FriendRow