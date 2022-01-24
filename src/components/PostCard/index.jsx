import styles from './PostCard.module.scss';
import { formatDistance } from 'date-fns';
import { it } from 'date-fns/locale';
import PostReactions from '../PostReactions';
import { BsThreeDots } from "react-icons/bs";
import { Link } from 'react-router-dom';
import UrlPreview from '../UrlPreview';

const PostCard = ({ postContent, reloader, setReloader }) => {
    return (
        <article className={styles.main}>
            <div className={styles.header}>
                <div className={styles.user}>
                    <Link to={'/profile'} state={postContent.authorId}>
                        <div className={styles.profileImg} style={{ backgroundImage: `url(${postContent.authorPhoto})` }}></div>
                    </Link>
                    <div className={styles.postInfo}>
                        <Link to={'/profile'} state={postContent.authorId}><p className={styles.author}>{postContent.authorName} {postContent.authorSurname}</p></Link>
                        <p className={styles.date}>
                            {formatDistance(new Date(postContent.date), new Date(), { addSuffix: true, locale: it })}
                        </p>
                    </div>

                </div>
                <div className={styles.btn}>
                    <BsThreeDots />
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles.postText}>{postContent.text}</p>
                {
                    postContent.url.find &&
                    <UrlPreview content={postContent.url} />
                }
                {postContent.photo &&
                    <img className={styles.postImg} src={postContent.photo} alt={postContent.author} />
                }
            </div>
            <div className={styles.footer}>
                <PostReactions reloader={reloader} setReloader={setReloader} postContent={postContent} />
            </div>
        </article>
    )
}

export default PostCard;