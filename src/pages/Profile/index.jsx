import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { http } from './../../libs/http'
import styles from './Profile.module.scss';
import { TiMail, TiPencil, TiGroup, TiImage } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";


import Posts from '../../components/Posts';
import UserPhoto from '../../components/UserPhoto';
import UserFriends from '../../components/UserFriends';



const Profile = () => {
    const myProfile = useSelector(state => state.login.value);
    const [link, setLink] = useState('post');

    const stateFromLink = useLocation();
    const [profile, setProfile] = useState({
        name: '',
        surname: '',
        email: '',
        photo: 'https://i.ibb.co/rZ1HGTB/user.png',
        bio: {
            alias: '',
            job: '',
            sex: '',
            about: '',
            cover: '',
            allPhotos: []
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0);
        http('/users/' + stateFromLink.state).then(data => setProfile(data))
    }, [stateFromLink.state])

    const friendShipREQ = (friendId, myId) => {

    }

    return (

        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.cover} style={{ backgroundImage: `url(${profile.bio.cover})` }}></div>
                <div className={styles.info}>
                    <div className={styles.profileImg} style={{ backgroundImage: `url(${profile.photo})` }}></div>
                    <div className={styles.profileInfo}>
                        <h3>{profile.name} {profile.bio.alias && `"${profile.bio.alias}"`} {profile.surname}</h3>
                        <p>{profile.bio.job}</p>
                    </div>
                    <div className={styles.btnWrapper}>
                        {myProfile.id !== profile.id &&
                            <button className={styles.sendRequest} onClick={() => friendShipREQ(profile.id, myProfile.id)} disabled={
                                myProfile.friendreq.filter((item) => item.id === profile.id).length > 0 ? true :
                                    myProfile.friends.filter((item) => item.id === profile.id).length > 0 ? true : false}>{
                                    myProfile.friendreq.filter((item) => item.id === profile.id).length > 0 ? 'Richiesta Inviata' :
                                        myProfile.friends.filter((item) => item.id === profile.id).length > 0 ? 'Già amico' : 'Invia Richiesta'
                                }</button>}
                        {myProfile.id !== profile.id ?
                            <button className={styles.sendMessage}><TiMail /></button> :
                            <button className={styles.optionBtn}>
                            <BsThreeDots />
                            </button>
                        }
                    </div>
                </div>
                <div className={styles.headerNav}>
                    <ul>
                        <li className={(link === 'post') ? styles.active : ''} onClick={() => setLink('post')} >Post</li>
                        <li className={(link === 'amici') ? styles.active : ''} onClick={() => setLink('amici')}>Amici</li>
                        <li className={(link === 'foto') ? styles.active : ''} onClick={() => setLink('foto')}>Foto</li>
                    </ul>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <h4>About</h4>
                    <p>{profile.bio.about}</p>
                </div>
                <div className={styles.right}>
                    {link === 'post' ?
                        <>
                            <div className={styles.postHeader}><span><TiPencil /></span>Post di {profile.name}</div>
                            {profile.id &&
                                <Posts single={profile.id} />
                            }
                        </>
                        :
                        link === 'amici' ?
                            <>
                                <div className={styles.postHeader}><span><TiGroup /></span>Amici di {profile.name}</div>
                                <UserFriends friendsList={profile.friends} />
                            </>
                            :
                            <>
                                <div className={styles.postHeader}><span><TiImage /></span>Foto di {profile.name}</div>
                                <UserPhoto allPhotos={profile.bio.allPhotos} />
                            </>}
                </div>
            </div>
        </div>
    )
}

export default Profile