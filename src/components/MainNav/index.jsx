import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './MainNav.module.scss';
import { TiHomeOutline, TiFlash, TiGroup, TiMessage, TiZoom } from "react-icons/ti";
import CountBadge from '../CountBadge';


const MainNav = () => {
    const user = useSelector(state => state.login.value);
    const discussions = Object.keys(user.messages);
    let messagesToRead = {}
    // discussions.forEach(key => {
    //     user.messages[key].discussion.forEach(notRead => {
    //         !notRead.read && (messagesToRead = { ...messagesToRead, [key]: '' })
    //     })
    // })



    return (
        <nav>
            <ul>
                <NavLink className={({ isActive }) => isActive ? styles.active : ''} to={'/'}><li><TiHomeOutline /></li></NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.active : ''} to={'/friends'}><li><CountBadge toCount={user.friendrec} /><TiGroup /></li></NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.active : ''} to={'/messages'}><li><CountBadge toCount={Object.keys(messagesToRead)} /><TiMessage /></li></NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.active : ''} to={'/notifies'}><li><CountBadge toCount={user.notify.filter(item => !item.read)} /><TiFlash /></li></NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.active : ''} to={'/people'}><li><TiZoom /></li></NavLink>
            </ul>
        </nav>
    )
}

export default MainNav;