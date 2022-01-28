import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLogin } from './../../libs/loginSlice';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { http, httpPOST } from './../../libs/http'
import styles from './Profile.module.scss';
import { TiMail, TiPencil, TiGroup, TiImage, TiUserAdd, TiTick } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";



import Posts from '../../components/Posts';
import UserPhoto from '../../components/UserPhoto';
import UserFriends from '../../components/UserFriends';



const Profile = () => {
    const myProfile = useSelector(state => state.login.value);
    const [disabled, setDisabled] = useState(false);
    const [link, setLink] = useState('post');
    // const dispatch = useDispatch();

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

    const friendShipREQ = (friendId, userId) => {
        setDisabled(true);
        httpPOST('/sendfriendrequest', { myId: userId, friendId: friendId })
        // .then(data => {
        //     httpPOST('/checksession', {
        //         userId: myProfile.id,
        //         login_time: myProfile.login_time,
        //         user_token: myProfile.user_token,
        //         logged: myProfile.logged,
        //         checkSession: myProfile.checkSession
        //       }).then(data => {
        //           dispatch(setLogin(data))

        //           window.localStorage.setItem('feisbrut', JSON.stringify({ 
        //             userId: data.id,
        //             login_time: data.login_time,
        //             user_token: data.user_token,
        //             checkSession: data.checkSession,
        //             logged: data.logged 
        //         }))
        //         })
        // })
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
                            <button className={styles.sendRequest} onClick={() => friendShipREQ(profile.id, myProfile.id)} disabled={disabled}>{
                                myProfile.friendreq.filter((item) => item.id === profile.id).length > 0 ? <TiUserAdd /> :
                                    myProfile.friends.filter((item) => item.id === profile.id).length > 0 ? <TiTick /> : <TiUserAdd />
                            }</button>}
                        {myProfile.id !== profile.id ?
                            <Link to={'/Feisbrut-React-Social/discussion'} state={{ user: profile }}>
                                <button className={styles.sendMessage}><TiMail /></button>
                            </Link> :
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