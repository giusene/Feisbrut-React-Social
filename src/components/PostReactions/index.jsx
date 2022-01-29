
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { likeFunc } from './../../libs/http';
import styles from './PostReactions.module.scss';
import { TiHeartOutline, TiMessageTyping } from "react-icons/ti";
import CommentRow from '../CommentRow';
import CommentForm from '../CommentForm';
import { httpCOMMENT } from './../../libs/http';


const PostReactions = ({ postContent, reloader, setReloader }) => {
    const user = useSelector(state => state.login.value);
    const [showMessage, setShowMessage] = useState(false);
    const commentsWrapper = useRef(0)

    const handlerLike = (likeType) => {
        if (likeType === 'like') {
            postContent.likes = [...postContent.likes, user.id]
        } else {
            postContent.likes = postContent.likes.filter((like) => like !== user.id);
        }
        likeFunc({
            type: likeType,
            userId: `${user.id}`,
            postId: `${postContent.id}`,
            date: new Date().toISOString(),
        }).then(data => setReloader(!reloader))
    }

    const hadlerComment = (e, input, setInput) => {
        e.preventDefault();
        if (input.trim() !== '') {
            httpCOMMENT('/comments', {
                authorId: user.id,
                postId: postContent.id,
                text: input,
                date: new Date().toISOString(),
            }).then(data => setReloader(!reloader))
                .then(data => setInput(''))
        }
    }

    useEffect(() => {
        commentsWrapper.current.scrollTop = commentsWrapper.current.scrollHeight
    }, [commentsWrapper.current.scrollHeight])

    return (
        <div className={styles.main}>
        
            <div className={styles.buttons}>
                <div className={styles.likes}>
                    {postContent.likes.filter(like => like.authorId === user.id).length > 0 ?
                        <div className={`${styles.likeBtn} ${styles.active}`} onClick={() => handlerLike('dislike')}><TiHeartOutline /></div> :
                        <div className={`${styles.likeBtn}`} onClick={() => handlerLike('like')}><TiHeartOutline /></div>
                    }
                    
                    <p>{postContent.likes.length} Mi piace</p>
                </div>
                <div className={styles.comments} onClick={() => setShowMessage(showMessage ? false : true)}>
                    <p>{postContent.comments.length} Commenti</p>
                    <div className={styles.commentBtn}><TiMessageTyping /></div>
                </div>
            </div>
            <div className={(!showMessage ? styles.commentsContainer : `${styles.commentsContainer} ${styles.open}`)}>
                        <div ref={commentsWrapper} className={styles.commentrows}>
                        {postContent.comments.map((comment, index) => <CommentRow key={index} comment={comment}/>)}
                        </div>
                        <CommentForm sendFunc={hadlerComment}/>
            </div>
        </div>
    )
}

export default PostReactions;