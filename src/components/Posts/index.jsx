import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Posts.module.scss';
import { getPost } from '../../libs/http';
import PostCard from '../PostCard';
import NewPost from '../NewPost';

const Posts = ({multi, single}) => {
    const user = useSelector(state => state.login.value);
    const [posts, setPosts] = useState([]);
    const [reloader, setReloader] = useState(true)

    
    useEffect(()=> {
        const myFriends = user.friends.map(friend => {
            return friend.id
        })

        getPost(multi ? [...myFriends, user.id] : [single]).then(data => setPosts(data));
    }, [reloader, user.friends, multi, single, user.id])


    return (
        <div className={styles.main}>
        {multi && <NewPost userInfo={user} reloader={reloader} setReloader={setReloader} /> }
            {posts.map((post) => <PostCard key={post.id} postContent={post} reloader={reloader} setReloader={setReloader} />)}
        </div>
    )
}

export default Posts;