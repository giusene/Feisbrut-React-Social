import styles from './NotifyBadge.module.scss';
import { TiHeartOutline, TiMessageTyping, TiUserAdd } from "react-icons/ti";

const NotifyBadge = ({ type }) => {
    return (
        <div className={styles.main}>
            {type === 'like' ?
                <span className={styles.heart}><TiHeartOutline /></span> :
                type === 'comment' ?
                <span className={styles.comment}><TiMessageTyping /></span> : 
                <span className={styles.friend}><TiUserAdd /></span>
            }
        </div>
    )
}

export default NotifyBadge