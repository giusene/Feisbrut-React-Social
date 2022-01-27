import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.main}>
            <div className={styles.copy}>
                <p>realizzazione</p>
            </div>
            <div className={styles.credit}>
                <p>Giuseppe Senettone</p>
                <p>Giorgio Collovà</p>
            </div>
        </div>
    )
}

export default Footer;