import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { httpPOST, uploadImg, linkPreview, httpUPDATE } from '../../libs/http';
import styles from './NewPost.module.scss';
import { TiPencil, TiImage, TiArrowForward } from "react-icons/ti";

import UrlPreview from '../UrlPreview';




const NewPost = ({ setReloader, reloader, userInfo }) => {
    const [link, setLink] = useState({
        url: '',
        find: false
    });

    const postState = {
        text: '',
        photo: { name: 'Carica Foto' },
    };

    const user = useSelector(state => state.login.value);
    const [uploadInput, setUploadInput] = useState(postState.photo);
    const [messageInput, setMessageInput] = useState(postState.text);
    const [formPostObject, setFormPostObject] = useState(postState);

    const [btnDisabled, setBtnDisabled] = useState(false);

    const handlerUploadRemove = () => {
        setUploadInput({ name: 'Carica Foto' })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (messageInput.trim() !== '' || uploadInput.name !== 'Carica Foto') {
            setBtnDisabled(true)
            if (uploadInput.name === 'Carica Foto') {
                httpPOST('/posts', {...formPostObject, url: link}).then(() => {
                    setMessageInput('');
                    setReloader(reloader ? false : true);
                    setBtnDisabled(false);
                    setLink({
                        url: '',
                        find: false
                    })
                });
            }
            else {
                setUploadInput({ name: 'Caricamento...' });
                uploadImg(uploadInput)
                    .then((result) => {
                        httpPOST('/posts', { ...formPostObject, photo: result.data.display_url, url: link }).then(() => {
                            setMessageInput('');
                            // DA TESTARE
                            httpUPDATE(`/users/${user.id}`, {bio: {...user.bio, allPhotos: [...user.bio.allPhotos, {type: 'caricamenti', url: result.data.display_url}]}}).then(data => console.log(data))
                            setFormPostObject(postState);
                            setUploadInput({ name: 'Carica Foto' });
                            setReloader(reloader ? false : true);
                            setBtnDisabled(false);
                            setLink({
                                url: '',
                                find: false
                            })
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        setUploadInput({ name: 'errore nel caricamento!' });
                        setBtnDisabled(false);
                        ;
                    });
            }
        }
    }

    useEffect(() => {
        if (link.find === false) {
            if (messageInput.match(/\bhttps?:\/\/\S+/gi)) {
                linkPreview(messageInput.match(/\bhttps?:\/\/\S+/gi)).then(data => {
                    data.error >= 400 ?
                        setLink({
                            url: '',
                            find: false
                        })
                        :
                        setLink({
                            url: data.url,
                            image: data.image,
                            title: data.title,
                            description: data.description,
                            find: true
                        })
                })
            }
        }
        setFormPostObject({
            authorId: user.id,
            text: messageInput,
            date: new Date().toISOString(),
            likes: [],
            comments: [],
        })
    }, [messageInput, link.find, user.id])

    return (
        <div className={styles.main}>
            <div className={styles.header}><span><TiPencil /></span>Crea Post</div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.content}>
                    <div className={styles.profileImg} style={{ backgroundImage: `url(${userInfo.photo})` }}></div>
                    <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder='A cosa stai pensando?' rows='3'></textarea>
                </div>
                {link.find &&
                    <UrlPreview setLink={setLink} content={link} />
                }
                <div className={styles.footer}>
                    <div className={styles.left}>
                        <label htmlFor='upload' className={styles.uploadBtn}><span><TiImage /></span>{uploadInput.name.substring(0, 15)}</label>
                        {uploadInput.name !== 'Carica Foto' && <p className={styles.removeUp} onClick={handlerUploadRemove}>rimuovi</p>}
                        <input type="file" onChange={(e) => setUploadInput(e.target.files[0] || uploadInput)} accept='.jpg, .jpeg, .png' placeholder='carica' name='upload' id='upload' title='Carica' className={styles.hidden} />
                    </div>
                    <div className={styles.right}><button disabled={btnDisabled}><TiArrowForward /></button></div>
                </div>
            </form>
        </div>
    )
}

export default NewPost;