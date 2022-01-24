import styles from './PagesHeader.module.scss';
import { TiMediaPlay } from "react-icons/ti";


const PagesHeader = ({title, who}) => {
    return (
        <div className={styles.main}><h2>{title}</h2>
        {who &&
            <div className={styles.who}><TiMediaPlay /> 
            <div className={styles.img} style={{ backgroundImage: `url(${who.photo})` }}></div>
            <p>{who.name} {who.surname}</p>
            </div>
        }
        </div>
    )
}

export default PagesHeader