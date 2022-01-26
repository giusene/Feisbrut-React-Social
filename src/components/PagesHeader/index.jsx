import styles from './PagesHeader.module.scss';
import { Link } from 'react-router-dom';
import { TiMediaPlay } from "react-icons/ti";


const PagesHeader = ({title, who}) => {
    return (
        <div className={styles.main}><h2>{title}</h2>
        {who &&
            <div className={styles.who}><TiMediaPlay /> 
            <Link to={'/profile'} state={who.id}><div className={styles.img} style={{ backgroundImage: `url(${who.photo})` }}></div>
            <p>{who.name} {who.surname}</p></Link>
            </div>
        }
        </div>
    )
}

export default PagesHeader