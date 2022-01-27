import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './../../libs/loginSlice';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { TiArrowSortedDown, TiSpanner, TiExport, TiUser } from "react-icons/ti";
import { useState } from 'react';


const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.value);
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.main} onClick={() => setOpen(!open)}>
            <div className={styles.profileName}>
                <p>{user.name}
                    {/* {user.bio.alias && `"${user.bio.alias}"`} */}
                </p>
            </div>
            <div className={styles.profileImg} style={{ backgroundImage: `url(${user.photo})` }}></div>
            <div className={styles.profileBtn}><TiArrowSortedDown /></div>
            {open &&
                <div className={styles.dropDown}>
                    <ul>
                        <li><Link to={'/Feisbrut-React-Social/profile'} state={user.id}><span><TiUser /></span>Profilo</Link></li>
                        <li><Link to='/Feisbrut-React-Social/profileupdate'><span><TiSpanner /></span>Impostazioni</Link></li>
                        <li onClick={() => dispatch(setLogin({ logged: false }))}><Link to='/Feisbrut-React-Social/'><span><TiExport /></span>Logout</Link></li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Login;