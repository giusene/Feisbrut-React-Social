import { useEffect } from 'react';
import styles from './Feeds.module.scss';
import Posts from './../../components/Posts'

const Feeds = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <div className={styles.main}>
            <Posts multi={true}/>
        </div>
    )
}

export default Feeds;