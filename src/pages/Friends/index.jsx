import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './Friends.module.scss';
import UserCard from '../../components/UserCard';
import PagesHeader from '../../components/PagesHeader';

const Friends = () => {
    const user = useSelector(state => state.login.value);

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className={styles.main}>
            <PagesHeader title={'Amici'} />
            <div className={styles.content}>
            {user.friends.map(friend => <UserCard key={friend.id} user={friend} />)}
            </div>
        </div>
    )
}

export default Friends;