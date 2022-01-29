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


    useEffect(() => {
        window.scrollTo(0, 0);
        httpPOST('/readmessages', {
            my_id: user.id,
            friend_id: stateFromLink.state.user.id
        })
        chatWrapper.current.scrollTop = chatWrapper.current.scrollHeight
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