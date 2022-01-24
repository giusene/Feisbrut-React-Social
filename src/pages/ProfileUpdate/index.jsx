import { useEffect } from 'react';
import styles from './ProfileUpdate.module.scss';
import ProfileUpdateFrom from '../../components/ProfileUpdateForm';


const ProfileUpdate = () => {

    useEffect(() => {
        window.scrollTo(0, 0);

    }, [])

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h2>Aggiorna Informazioni</h2>
            </div>
            <ProfileUpdateFrom />
        </div>
    )
}

export default ProfileUpdate