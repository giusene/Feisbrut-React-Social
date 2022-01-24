import { formatDistance } from 'date-fns';
import { it } from 'date-fns/locale';
import NotifyBadge from '../NotifyBadge';
import styles from './Notify.module.scss';
import { Link } from 'react-router-dom';

const Notify = ({ notify, removelist }) => {
    return (
        <li className={notify.read ? styles.main : `${styles.main} ${styles.active}`}>
            <input type="checkbox" onChange={(e) => removelist(e, notify.notify_id)} />
            <div className={styles.profileImg} style={{ backgroundImage: `url(${notify.user[0].photo})` }}>
                <div className={styles.type}>
                    <NotifyBadge type={notify.type} />
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.who}>
                    <Link to={'/profile'} state={notify.user[0].id}><span>{notify.user[0].name} {notify.user[0].surname}</span></Link>
                    {notify.type === 'like' ?
                        <> ha messo mi piace al tuo <Link to={'/post'} state={notify.postID}><span>Post!!!</span></Link></> :
                        notify.type === 'comment' ?
                            <> ha commentato il tuo <Link to={'/post'} state={notify.postID}><span>Post!!!</span></Link></> :
                            notify.type === 'friendConfirmed' ?
                                <> ti ha inviato una richiesta d'amicizia</> :
                                <> ha accettato la richiesta d'amiciza</>
                    }
                </div>
                <div className={styles.date}>
                    {formatDistance(new Date(notify.date), new Date(), { addSuffix: true, locale: it })}
                </div>
            </div>
        </li>

    )
}

export default Notify;