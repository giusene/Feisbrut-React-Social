import styles from './UserFriends.module.scss';
import UserCard from '../../components/UserCard';
// import { useEffect, useState } from 'react';
// import { httpFRIENDS } from '../../libs/http';

const UserFriends = ({friendsList}) => {

    return (
        <div className={styles.main}>
            <div className={styles.content}>
            {friendsList.map(friend => <UserCard key={friend.id} user={friend} btn={true} />)}
            </div>
        </div>
    )
}

export default UserFriends;