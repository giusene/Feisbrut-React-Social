import { useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './../src/libs/loginSlice';
import { httpPOST } from './libs/http';

import LoginPage from "./pages/LoginPage";
import Main from './pages/Main';

function App() {

  const dispatch = useDispatch();
  
  const setUser = useCallback(
    (data) => {
      dispatch(setLogin(data))
        window.localStorage.setItem('feisbrut', JSON.stringify({ 
        userId: data.id,
        login_time: data.login_time,
        user_token: data.user_token,
        checkSession: data.checkSession,
        logged: data.logged 
    }));
    }, [dispatch])


  useEffect(() => {
    if (window.localStorage.getItem('feisbrut')) {
      const user = JSON.parse(window.localStorage.getItem('feisbrut'));
      
      httpPOST('/checksession', {
        userId: user.userId,
        login_time: user.login_time,
        user_token: user.user_token,
        logged: user.logged,
        checkSession: user.checkSession
      }).then(data => {
        setUser(data)
      })
    } 
  
  }, [setUser])

  const login = useSelector(state => state.login.value);

  return (
    <>
      <Routes>
        <Route path="*" element={login.logged ? <Main /> : <LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
