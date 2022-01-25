import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { httpPOST } from '../../libs/http'
import UserCard from '../UserCard'
import styles from './RandomUsers.module.scss'

const RandomUsers = () => {
    const [random, setRandom] = useState([]);
    const user = useSelector(state => state.login.value);


    useEffect(() => {
        setTimeout(() => {
            httpPOST('/randomusers', {
                userId: `${user.id}`,
            }).then(data => setRandom(data))
        }, 500)
    }, [user.id])

    return (
        <div className={styles.main}>
            <h4>Persone che potresti conoscere</h4>
            {random.length > 0 &&
                random.map(friend => <UserCard key={friend.id} user={friend} btn />)
                }
        </div>

    )
}

export default RandomUsers