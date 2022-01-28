import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './../../libs/loginSlice';
import styles from './Header.module.scss';
import Logo from './../Logo';
import MainNav from '../MainNav';
import Login from '../Login';
import { useEffect } from 'react';
import { httpPOST } from '../../libs/http';

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.value);

    useEffect(() => {

        const updateUser = setInterval(() => {
            
            httpPOST(`/checksession/${user.id}`, {
                userId: user.id,
                login_time: user.login_time,
                user_token: user.user_token,
                logged: user.logged,
                checkSession: user.checkSession
            }).then(data => {
                console.log(user.id)
                console.log('check session...')
                    dispatch(setLogin({...data, id: user.id}))
                    window.localStorage.setItem('feisbrut', JSON.stringify({
                    userId: user.id,
                    login_time: data.login_time,
                    user_token: data.user_token,
                    checkSession: data.checkSession,
                    logged: data.logged
                }))
            })
            
        }, 2000);

        return () => clearInterval(updateUser);


    }, [dispatch, user.userId, user.checkSession, user.id, user.logged, user.login_time, user.user_token])

    return (
        <>
            <div className={styles.main}>
                <div className={styles.left}><Logo /></div>
                <div className={styles.center}><MainNav /></div>
                <div className={styles.right}><Login /></div>
            </div>
            <div className={styles.mainMobile}>
                <div className={styles.center}><MainNav /></div>
            </div>
        </>
    )
}

export default Header;