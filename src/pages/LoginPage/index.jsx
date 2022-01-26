import styles from './LoginPage.module.scss';
import LoginLeftSide from './../../components/LoginLeftSide';
import LoginWrapper from './../../components/LoginWrapper';
import backgroundImg from './../../libs/img/socialbg.jpeg'

const LoginPage = () => {
    return (
        <div className={styles.main}>
            <div className={styles.left} style={{ backgroundImage: `url(${backgroundImg})` }}>
                <LoginLeftSide />
            </div>
            <div className={styles.right}>
                <LoginWrapper />
            </div>
        </div>
    )
}

export default LoginPage;