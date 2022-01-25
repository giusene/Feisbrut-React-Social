import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './Main.module.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import FriendsList from '../../components/FriendsList';
import FriendRequest from '../../components/FriendRequest';

import Feeds from '../Feeds';
import Friends from '../Friends';
import Profile from '../Profile';
import ProfileUpdate from '../ProfileUpdate';
import Notifies from '../Notifies';
import People from '../People';
import Messages from '../Messages';
import Discussion from '../Discussion';
import PostPage from '../PostPage';
import RandomUsers from '../../components/RandomUsers';






const Main = () => {
    const user = useSelector(state => state.login.value);

    return (
        <div className={styles.main}>
            <Header />
            <div className={styles.content}>
                <aside className={styles.left}>
                {user.friendrec.length > 0 &&
                    <FriendRequest />
                }
                    <RandomUsers />
                </aside>
                <aside className={styles.right}>
                    <FriendsList />
                </aside>
                <main>
                    <Routes>
                        <Route path="/" element={<Feeds />} />
                        <Route path="/Feisbrut-React-Social" element={<Feeds />} />
                        <Route path="/friends" element={<Friends />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/profileupdate" element={<ProfileUpdate />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/discussion" element={<Discussion />} />
                        <Route path="/post" element={<PostPage />} />
                        <Route path="/notifies" element={<Notifies />} />
                        <Route path="/people" element={<People />} />
                        <Route path="*" element={<h1>tutto</h1>} />
                    </Routes>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default Main