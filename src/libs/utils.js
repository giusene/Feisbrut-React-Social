export const checkpass = (pass, rpass) => {
    if (pass === rpass) return true;
    else return false;
}


export function capitalizeFirstLetter(string) {
    string = string.toLocaleLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// HOT-RELOAD PER LO USER
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserReload } from './../../libs/loginSlice';
// const dispatch = useDispatch();
// const test = useSelector(state => state.login.userReload);
// dispatch(setUserReload())