import { useState } from 'react';
import LoginForm from '../LoginForm';
import SignUp from '../SignUp'
import styles from './LoginWrapper.module.scss';

const LoginWrapper = () => {
    const [form, setFrom] = useState('login');

    return (
        <div className={styles.main}>
            {form === 'login' ? <LoginForm setForm={setFrom} /> :
                form === 'registration' ? <SignUp setForm={setFrom} /> : null
            }
        </div>
    )
}
export default LoginWrapper;