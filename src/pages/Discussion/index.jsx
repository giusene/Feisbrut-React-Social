import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
// import { useEffect, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLogin } from './../../libs/loginSlice';
import styles from './Discussion.module.scss';

import PagesHeader from '../../components/PagesHeader';
import ChatRow from '../../components/ChatRow';
import CommentForm from '../../components/CommentForm';
import { httpPOST } from '../../libs/http';

const Discussion = () => {
    const stateFromLink = useLocation();
    // const dispatch = useDispatch();
    const chatWrapper = useRef(0)
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

    //               window.localStorage.setItem('feisbrut', JSON.stringify({ 
    //                 userId: data.id,
    //                 login_time: data.login_time,
    //                 user_token: data.user_token,
    //                 checkSession: data.checkSession,
    //                 logged: data.logged 
    //             }))

    //             })
    //     }, [dispatch, user.id, user.login_time, user.user_token, user.logged, user.checkSession])
    

    useEffect(() => {
        window.scrollTo(0, 0);
        chatWrapper.current.scrollTop = chatWrapper.current.scrollHeight
        httpPOST('/readmessages', {
            my_id: user.id,
            friend_id: stateFromLink.state.user.id
        })
        // .then(data => reload)
    }, [ stateFromLink.state.user.id, user.id, chatWrapper.current.scrollHeight])


    const sendMessage = (e, input, setInput) => {
        e.preventDefault()
        httpPOST('/instantmessage', {
            my_id: user.id,
            friend_id: stateFromLink.state.user.id,
            text: input
        })
        .then(data => {
            setInput('');
            // httpPOST('/checksession', {
            //     userId: user.id,
            //     login_time: user.login_time,
            //     user_token: user.user_token,
            //     logged: user.logged,
            //     checkSession: user.checkSession
            //   }).then(data => {
            //       dispatch(setLogin(data))

            //       window.localStorage.setItem('feisbrut', JSON.stringify({ 
            //         userId: data.id,
            //         login_time: data.login_time,
            //         user_token: data.user_token,
            //         checkSession: data.checkSession,
            //         logged: user.logged 
            //     }))
            //     })
        })
    }

    return (
        <div className={styles.main}>
            <PagesHeader title={'Chat'} who={stateFromLink.state.user} />
            <div className={styles.content}>
                <div ref={chatWrapper} className={styles.discussion}>
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