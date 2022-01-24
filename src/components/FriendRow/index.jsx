import { Link } from 'react-router-dom';
import styles from './FriendRow.module.scss';

const FriendRow = ({friendContent}) => {
    return (
        <Link to={'/discussion'} state={{user: friendContent}}>
        <div className={styles.main}>
            <div className={styles.userImg} style={{ backgroundImage: `url(${friendContent.photo})` }}></div>
            <div className={styles.userName}>{friendContent.name} {friendContent.surname}</div>
            { 
                (Date.now() / 60000) - (friendContent.login_time / 60000) <= 1 ? <div className={styles.userStatus}>verde</div> :
                (Date.now() / 60000) - (friendContent.login_time / 60000) > 1 && (Date.now() / 60000) - (friendContent.login_time / 60000) < 5 ? <div className={styles.userStatus}>giallo</div> :
                <div className={styles.userStatus}>girgio</div>
            }
            
        </div>
        </Link>
    )
}

export default FriendRow