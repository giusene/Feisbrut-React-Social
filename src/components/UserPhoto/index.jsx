import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import styles from './UserPhoto.module.scss';

const UserPhoto = ({ allPhotos }) => {
   const profilePhotos = allPhotos.filter(photo => photo.type === 'profile');
   const coverPhotos = allPhotos.filter(photo => photo.type === 'cover');
   const caricamentiPhotos = allPhotos.filter(photo => photo.type === 'caricamenti');

   const [galleryBtn, setGalleryBtn] = useState('caricamenti')

   const [lightbox, setLightbox] = useState({
      isOpen: false,
      photoIndex: 0,
      gallery: []
   })

   return (
      <div className={styles.main}>
         <ul>
            <li className={galleryBtn === 'caricamenti' ? styles.active : ''} onClick={() => setGalleryBtn('caricamenti')}><h4>Caricamenti</h4></li>
            <li className={galleryBtn === 'profile' ? styles.active : ''} onClick={() => setGalleryBtn('profile')}><h4>Foto Profilo</h4></li>
            <li className={galleryBtn === 'cover' ? styles.active : ''} onClick={() => setGalleryBtn('cover')}><h4>Foto Copertina</h4></li>
         </ul>

         <div className={styles.photosWrapper}>
            {
               galleryBtn === 'caricamenti' &&
               <>
                  {
                     caricamentiPhotos.length > 0 ?
                        caricamentiPhotos.map((photo, index) => (
                           <img onClick={() => {
                              setLightbox({
                                 isOpen: true,
                                 photoIndex: index,
                                 gallery: caricamentiPhotos
                              })
                           }} src={photo.url} alt={photo.type} key={index} />)) :
                        <p className={styles.nothing}>non ci sono foto</p>
                  }


               </>
            }
            {
               galleryBtn === 'profile' &&
               <>
                  {profilePhotos.length > 0 ?
                     profilePhotos.map((photo, index) => (
                        <img onClick={() => {
                           setLightbox({
                              isOpen: true,
                              photoIndex: index,
                              gallery: profilePhotos
                           })
                        }} src={photo.url} alt={photo.type} key={index} />)) :
                     <p className={styles.nothing}>non ci sono foto</p>
                  }
               </>

            }
            {
               galleryBtn === 'cover' &&
               <>
                  {coverPhotos.length > 0 ?
                     coverPhotos.map((photo, index) => (
                        <img onClick={() => {
                           setLightbox({
                              isOpen: true,
                              photoIndex: index,
                              gallery: coverPhotos
                           })
                        }} src={photo.url} alt={photo.type} key={index} />)) :
                     <p className={styles.nothing}>non ci sono foto</p>
                  }
               </>
            }

         </div>


         {lightbox.isOpen && (
            <Lightbox
               mainSrc={lightbox.gallery[lightbox.photoIndex].url}
               nextSrc={lightbox.gallery[(lightbox.photoIndex + 1) % lightbox.gallery.length]}
               prevSrc={lightbox.gallery[(lightbox.photoIndex + lightbox.gallery.length - 1) % lightbox.gallery.length]}
               onCloseRequest={() => setLightbox({ ...lightbox, isOpen: false })}
               onMovePrevRequest={() =>
                  setLightbox({ ...lightbox, photoIndex: (lightbox.photoIndex + lightbox.gallery.length - 1) % lightbox.gallery.length })
               }
               onMoveNextRequest={() =>
                  setLightbox({ ...lightbox, photoIndex: (lightbox.photoIndex + 1) % lightbox.gallery.length })
               }
            />
         )}
      </div>
   )
}

export default UserPhoto;