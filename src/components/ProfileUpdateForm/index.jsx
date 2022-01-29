import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLogin } from './../../libs/loginSlice';
import { capitalizeFirstLetter } from "../../libs/utils";
import { httpUPDATE, uploadImg } from "../../libs/http";
import { TiImage, TiStopwatch } from "react-icons/ti";

import styles from './ProfileUpdateForm.module.scss'

const ProfileUpdateFrom = () => {
    const [disableBtn, setDisableBtn] = useState(true);
    // const dispatch = useDispatch();

    const user = useSelector(state => state.login.value);

    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [alias, setAlias] = useState(user.bio.alias);
    const [job, setJob] = useState(user.bio.job);
    // const [email, setEmail] = useState(user.email);
    // const [sex, setSex] = useState(user.bio.sex);
    const [about, setAbout] = useState(user.bio.about);

    const [photo, setPhoto] = useState(user.photo);
    const [cover, setCover] = useState(user.bio.cover);

    const [allPhotos, setAllPhotos] = useState(user.bio.allPhotos)

    const [form, setForm] = useState();

    const [coverInput, setCoverInput] = useState({ name: 'Cambia Cover' })
    const [profileInput, setProfileInput] = useState({ name: 'Cambia' })


    useEffect(() => {
        setForm({
            _id: user.db_id,
            name: capitalizeFirstLetter(name),
            surname: capitalizeFirstLetter(surname),
            email: user.email,
            photo: photo,
            bio: {
                alias: alias,
                job: job,
                sex: user.bio.sex,
                about: about,
                cover: cover,
                allPhotos: allPhotos
            },
        })

            name === user.name &&
            surname === user.surname &&
            alias === user.bio.alias &&
            job === user.bio.job &&
            // email === user.email &&
            // sex === user.bio.sex &&
            about === user.bio.about &&
            photo === user.photo &&
            cover === user.bio.cover ?
            setDisableBtn(true) : setDisableBtn(false);

    }, [name, user.db_id, surname, photo, alias, job, about, cover, allPhotos, user.bio.about, user.bio.alias, user.bio.cover, user.bio.job, user.bio.sex, user.email, user.name, user.photo, user.surname])


    const updateProfile = () => {
        setDisableBtn(true);
        httpUPDATE(`/users/${user.id}`, form)
    }

    return (
        <div className={styles.main}>
            <div className={styles.cover} style={{ backgroundImage: `url(${cover})` }}>

                <div className={styles.coverBtn}>
                    {coverInput.name !== 'Cambia Cover' ?
                        <label htmlFor='cover' className={styles.uploadBtn}><TiStopwatch /></label> :
                        <label htmlFor='cover' className={styles.uploadBtn}><TiImage /></label>
                    }
                    <input type="file" onChange={(e) => {
                        setCoverInput(e.target.files[0] || coverInput)
                        uploadImg(e.target.files[0]).then((result) => {
                            setCover(result.data.display_url);
                            setCoverInput({ name: 'Cambia Cover' })
                            setAllPhotos([...allPhotos, {
                                type: 'cover',
                                url: result.data.display_url
                            }])
                        })

                    }} accept='.jpg, .jpeg, .png' name='cover' id='cover' className={styles.hidden} />
                </div>


                <div className={styles.img} style={{ backgroundImage: `url(${photo})` }}>
                    <div className={styles.profileBtn}>
                        {profileInput.name !== 'Cambia' ?
                            <label htmlFor='profile' className={styles.uploadBtn}><TiStopwatch /></label> :
                            <label htmlFor='profile' className={styles.uploadBtn}><TiImage /></label>
                        }
                        <input type="file" onChange={(e) => {
                            setProfileInput(e.target.files[0] || profileInput)
                            uploadImg(e.target.files[0]).then((result) => {
                                setPhoto(result.data.display_url);
                                setProfileInput({ name: 'Cambia' })
                                setAllPhotos([...allPhotos, {
                                    type: 'profile',
                                    url: result.data.display_url
                                }])
                            })

                        }} accept='.jpg, .jpeg, .png' name='profile' id='profile' className={styles.hidden} />
                    </div>



                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.box}>
                    <label htmlFor='name'>Nome</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type='text' name='name' id='name' required />
                </div>
                <div className={styles.box}>
                    <label htmlFor='surname'>Cognome</label>
                    <input onChange={(e) => setSurname(e.target.value)} value={surname} type='text' name='surname' id='surname' required />
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.box}>
                    <label htmlFor='alias'>Alias</label>
                    <input onChange={(e) => setAlias(e.target.value)} value={alias} type='text' name='alias' id='alias' />
                </div>
                <div className={styles.box}>
                    <label htmlFor='job'>Job</label>
                    <input onChange={(e) => setJob(e.target.value)} value={job} type='text' name='job' id='job' />
                </div>
            </div>
            {/* <div className={styles.row}>
                <div className={styles.box}>
                    <label htmlFor='email'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' name='email' id='email' required />
                </div>
                <div className={styles.box}>
                    <label htmlFor='sex'>Sesso</label>
                    <input onChange={(e) => setSex(e.target.value)} value={sex} type='text' name='sex' id='sex' />
                </div>
            </div> */}
            <div className={styles.row}>
                <div className={styles.box}>
                    <label htmlFor='about'>About</label>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} name='about' id='about'></textarea>
                </div>
            </div>
            <div className={styles.row}>
                <button disabled={disableBtn} onClick={() => updateProfile()}>Aggiorna</button>
            </div>
        </div>
    )
}

export default ProfileUpdateFrom