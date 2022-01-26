import { useSelector } from 'react-redux';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import { it } from 'date-fns/locale';
import styles from './ChatRow.module.scss';

const ChatRow = ({ content, friend }) => {
    const user = useSelector(state => state.login.value);

    return (
        <div className={styles.main}>
                {content.author === user.id ?
                        <div className={styles.me}>
                        <Link to={'/profile'} state={user.id}><div className={styles.photo} style={{ backgroundImage: `url(${user.photo})` }}></div></Link>
                            <div className={styles.dx}>
                            <Link to={'/profile'} state={user.id}><p className={styles.name}>{user.name} {user.surname}</p></Link>
                                <p className={styles.text}>{content.text}</p>
                                <p className={styles.smallT}>{formatDistance(new Date(content.date), new Date(), { addSuffix: true, locale: it })}</p>
                            </div>
                        </div>
                        :
                        <div className={styles.friend}>
                        <Link to={'/profile'} state={friend.id}><div className={styles.photo} style={{ backgroundImage: `url(${friend.photo})` }}></div></Link>
                            <div className={styles.dx}>
                            <Link to={'/profile'} state={friend.id}><p className={styles.name}>{friend.name} {friend.surname}</p></Link>
                                <p className={styles.text}>{content.read === false ? <span className={styles.read}></span> : <></> }{content.text}</p>
                                <p className={styles.smallT}>{formatDistance(new Date(content.date), new Date(), { addSuffix: true, locale: it })}</p>
                            </div>
                        </div>
                }
        </div>
    )
}

export default ChatRow;