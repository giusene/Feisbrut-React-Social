import styles from './LoginPage.module.scss';
import LoginLeftSide from './../../components/LoginLeftSide';
import LoginWrapper from './../../components/LoginWrapper';

const LoginPage = () => {
    return (
        <div className={styles.main}>
            <div className={styles.left}>
            {console.log(window.location.href)}
                <LoginLeftSide />
            </div>
            <div className={styles.right}>
                <LoginWrapper />
            </div>
        </div>
    )
}

export default LoginPage;