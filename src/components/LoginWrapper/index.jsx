import { useState } from 'react';
import LoginForm from '../LoginForm';
import SignUp from '../SignUp'
import styles from './LoginWrapper.module.scss';
import LogoForm from '../LogoForm';

const LoginWrapper = () => {
    const [form, setFrom] = useState('login');

    return (
        <div className={styles.main}>
            <LogoForm />
            <div className={styles.container}>
                {
                    form === 'login' ? <LoginForm setForm={setFrom} /> :
                        form === 'registration' ? <SignUp setForm={setFrom} /> : null
                }

            </div>
        </div>
    )
}
export default LoginWrapper;