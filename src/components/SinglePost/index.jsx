import styles from './SinglePost.module.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { http } from '../../libs/http';
import PostCard from './../PostCard'

const SinglePost = () => {
    const [post, setPost] = useState([]);
    const [reloader, setReloader] = useState(true)
    const stateFromLink = useLocation();

    useEffect(() => {
        http(`/Feisbrut-React-Social/posts/${stateFromLink.state}`).then(data => setPost([data]));
      }, [reloader, stateFromLink.state])

    return (
        <div className={styles.main}>
            <div className={styles.content}>
            {post.map(single =>  <PostCard key={single.id} postContent={single} reloader={reloader} setReloader={setReloader} />)}
            </div>
        </div>
    )
}

export default SinglePost