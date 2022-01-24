import { useEffect } from 'react';
import styles from './PostPage.module.scss';
import SinglePost from '../../components/SinglePost';


const PostPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    return (
        <div className={styles.main}>
            <SinglePost />
        </div>
    )
}

export default PostPage;