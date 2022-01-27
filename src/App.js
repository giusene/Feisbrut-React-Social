import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin } from './../../libs/loginSlice';

import LoginPage from "./pages/LoginPage";
import Main from './pages/Main';
import { useEffect } from 'react';

function App() {
  const login = useSelector(state => state.login.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.localStorage.getItem('feisbrut')) {
      dispatch(setLogin(JSON.parse(window.localStorage.getItem('feisbrut'))))
    } else {
    }
    // window.localStorage.setItem('test', 'ciao');
  }, [])

  return (
    <>
    <Routes>
      <Route path="*" element={login.logged ? <Main /> : <LoginPage />} />
    </Routes>
    </>
  );
}

export default App;
