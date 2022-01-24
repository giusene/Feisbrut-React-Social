import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import { it } from 'date-fns/locale';
import styles from './CommentRow.module.scss';

const CommentRow = ({ comment }) => {
    return (
        <div className={styles.main}>
        <Link to={'/profile'} state={comment.authorId}><div className={styles.img} style={{ backgroundImage: `url(${comment.authorPhoto})` }}></div></Link>
            <div className={styles.comment}>
                <div className={styles.text}>
                <Link to={'/profile'} state={comment.authorId}>
                    <h4 styles={styles.author}>{comment.authorName} {comment.authorSurname}</h4>
                </Link>
                    <p styles={styles.message}>{comment.text}</p>
                </div>
                <div className={styles.date}>
                {formatDistance(new Date(comment.date), new Date(), { addSuffix: true, locale: it })}
                </div>
            </div>
        </div>
    )
}

export default CommentRow