import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { it } from 'date-fns/locale';
import styles from './MessagePreview.module.scss';

const MessagePreview = ({ messageId, message, removeList }) => {
    const user = useSelector(state => state.login.value);

    return (
        <div className={styles.main}>
            <input type="checkbox" onChange={(e) => removeList(e, messageId)} />
            <Link to={'/Feisbrut-React-Social/discussion'} state={message}>
                <div className={styles.status}></div>
                <div className={styles.profileImg} style={{ backgroundImage: `url(${message.user.photo})` }}></div>
                <div className={styles.name}>
                    {message.user.name} {message.user.surname}
                </div>
                <div className={styles.preview}>
                    {message.discussion[message.discussion.length - 1].read === false && <span></span>}
                    {message.discussion[message.discussion.length -1].author === user.id ? 'Tu: ' :
                    `${message.user.name}: `}
                    {message.discussion[message.discussion.length - 1].text}
                </div>
                <div className={styles.date}>
                    {formatDistance(new Date(message.discussion[message.discussion.length - 1].date), new Date(), { addSuffix: true, locale: it })}
                </div>
            </Link>
        </div>
    )
}

export default MessagePreview