import styles from './Header.module.scss';
import Logo from './../Logo';
import MainNav from '../MainNav';
import Login from '../Login';

const Header = () => {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.left}><Logo /></div>
                <div className={styles.center}><MainNav /></div>
                <div className={styles.right}><Login /></div>
            </div>
            <div className={styles.mainMobile}>
                <div className={styles.left}></div>
                <div className={styles.center}><MainNav /></div>
                <div className={styles.right}></div>
            </div>
        </>
    )
}

export default Header;