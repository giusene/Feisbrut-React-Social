import styles from './UrlPreview.module.scss';
import { TiDelete } from "react-icons/ti";

const UrlPreview = ({ content, setLink }) => {
    return (
        <div className={styles.main}>
        {setLink &&
            <div className={styles.close} onClick={() => setLink({
                url: '',
                find: false
            })}><TiDelete /></div>
        }
            <a href={`${content.url}`} target='_blank' rel="noreferrer">
                <div className={styles.content} style={{ backgroundImage: `url(${content.image})` }}>
                    <div className={styles.footer}>
                        <div className={styles.url}>{content.url}</div>
                        <div className={styles.title}>{content.title}</div>
                        <div className={styles.description}>{content.description.substr(0, 100)}</div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default UrlPreview