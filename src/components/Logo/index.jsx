import { Link } from 'react-router-dom';
import styles from './Logo.module.scss';

const Logo = () => {
    return (
        <Link to={'/Feisbrut-React-Social/'}><p className={styles.main}>feisbrut</p></Link>
    )
}

export default Logo;