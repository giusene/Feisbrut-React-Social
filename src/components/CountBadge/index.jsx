import styles from './CountBadge.module.scss';

const CountBadge = ({ toCount }) => {
    return (
        <>
            {toCount && toCount.length > 0 &&
                <span className={styles.badge}>{toCount.length}</span>
            }
        </>
    )
}

export default CountBadge