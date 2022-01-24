import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './CommentForm.module.scss';
import { TiArrowForward } from "react-icons/ti";


const CommentForm = ({ sendFunc }) => {
    const user = useSelector(state => state.login.value);
    const [input, setInput] = useState('');

    

    return (
        <div className={styles.main}>
            <form onSubmit={(e) => sendFunc(e, input, setInput)}>
                <div className={styles.photo} style={{ backgroundImage: `url(${user.photo})` }}></div>
                <input value={input} onChange={(e) => setInput(e.target.value)} type='text'/>
                <button><TiArrowForward /></button>
            </form>
        </div>
    )
}

export default CommentForm;