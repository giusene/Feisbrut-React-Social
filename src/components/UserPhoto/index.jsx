import styles from './UserPhoto.module.scss';

const UserPhoto = ({allPhotos}) => {
    
    return(
        <div className={styles.main}>
           {allPhotos.length > 0 ?
               allPhotos.map((photo, index) => (
               <img src={photo.url} alt={photo.type} key={index} />
           )) :
           <p>non ci sono foto</p>
           }
        </div>
    )
}

export default UserPhoto;