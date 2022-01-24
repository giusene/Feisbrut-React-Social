import { useSelector } from 'react-redux';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';
import { TiArrowSortedDown, TiSpanner, TiExport } from "react-icons/ti";
import { useState } from 'react';


const Login = () => {
    const user = useSelector(state => state.login.value);
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.main} onClick={() => setOpen(!open)}>
            <div className={styles.profileImg} style={{ backgroundImage: `url(${user.photo})` }}></div>
            <div className={styles.profileName}>
                <p>{user.name}
                    {/* {user.bio.alias && `"${user.bio.alias}"`} */}
                </p>
            </div>
            <div className={styles.profileBtn}><TiArrowSortedDown /></div>
            {open &&
                <div className={styles.dropDown}>
                    <ul>
                        <li><Link to='/profileupdate'><span><TiSpanner /></span>Impostazioni</Link></li>
                        <li><span><TiExport /></span>Logout</li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Login;