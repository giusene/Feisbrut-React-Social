import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './../../libs/loginSlice';
import styles from './Discussion.module.scss';

import PagesHeader from '../../components/PagesHeader';
import ChatRow from '../../components/ChatRow';
import CommentForm from '../../components/CommentForm';
import { httpPOST } from '../../libs/http';

const Discussion = () => {
    const stateFromLink = useLocation();
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.login.value);


    // const reload = useCallback(
    //     () => {
    //         httpPOST('/checksession', {
    //             userId: user.id,
    //             login_time: user.login_time,
    //             user_token: user.user_token,
    //             logged: user.logged,
    //             checkSession: user.checkSession
    //           }).then(data => {
    //               dispatch(setLogin(data))
    //             })
    //     }, [dispatch, user.id, user.login_time, user.user_token, user.logged, user.checkSession])
    

    useEffect(() => {
        window.scrollTo(0, 0);
    //     httpPOST('/readmessages', {
    //         my_id: user.id,
    //         friend_id: stateFromLink.state.user.id
    //     }).then(data => reload)
    // }, [reload, stateFromLink.state.user.id, user.id])
    }, [])

    const sendMessage = (e, input, setInput) => {
        e.preventDefault()
        httpPOST('/instantmessage', {
            my_id: user.id,
            friend_id: stateFromLink.state.user.id,
            text: input
        }).then(data => {
            setInput('');
            httpPOST('/checksession', {
                userId: user.id,
                login_time: user.login_time,
                user_token: user.user_token,
                logged: user.logged,
                checkSession: user.checkSession
              }).then(data => {
                  dispatch(setLogin(data))
                })
        })
    }

    return (
        <div className={styles.main}>
            <PagesHeader title={'Chat'} who={stateFromLink.state.user} />
            <div className={styles.content}>
                <div className={styles.discussion}>
                    {[stateFromLink.state.user.id] in user.messages &&
                        user.messages[stateFromLink.state.user.id].discussion.map((chatRow, index) =>
                            <ChatRow key={index} friend={stateFromLink.state.user} content={chatRow} />
                        )}
                </div>


                <div className={styles.chatInput}>
                    <CommentForm sendFunc={sendMessage} />
                </div>
            </div>
        </div>
    )
}

export default Discussion;