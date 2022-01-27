import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


import LoginPage from "./pages/LoginPage";
import Main from './pages/Main';
import { useEffect } from 'react';

function App() {
  const login = useSelector(state => state.login.value);

  useEffect(() => {
    if (window.localStorage.getItem('feisbrut')) {
      console.log('trovato');
    } else {
      console.log('non trovato');
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
