import styles from './SideNav.module.scss';
import { TiInfoLarge } from "react-icons/ti";


const SideNav = () => {
    return (
        <div className={styles.main}>
        <h4>Network</h4>
            <ul>
                <li><span><TiInfoLarge /></span>Badge</li>
                <li><span><TiInfoLarge /></span>Gruppi</li>
                <li><span><TiInfoLarge /></span>Pagine</li>
                <li><span><TiInfoLarge /></span>Account</li>
            </ul>
        </div>
    )
}

export default SideNav;
