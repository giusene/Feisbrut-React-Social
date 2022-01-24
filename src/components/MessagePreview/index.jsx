import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { it } from 'date-fns/locale';
import styles from './MessagePreview.module.scss';

const MessagePreview = ({ messageId,  message, removeList }) => {

    return (
        <div className={styles.main}>
            <input type="checkbox" onChange={(e) => removeList(e, messageId)} />
            <Link to={'/discussion'} state={message}>
                <div className={styles.status}></div>
                <div className={styles.profileImg} style={{ backgroundImage: `url(${message.user.photo})` }}></div>
                <div className={styles.name}>
                    {message.user.name} {message.user.surname}
                </div>
                <div className={styles.preview}>
                    {message.discussion[0].read === false && <span></span>}{message.discussion[0].text}
                </div>
                <div className={styles.date}>
                    {formatDistance(new Date(message.discussion[0].date), new Date(), { addSuffix: true, locale: it })}
                </div>
            </Link>
        </div>
    )
}

export default MessagePreview