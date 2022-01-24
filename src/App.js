import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from "./pages/LoginPage";
import Main from './pages/Main';

function App() {
  const login = useSelector(state => state.login.value)


  return (
    <>
    <Routes>
      <Route path="*" element={login.logged ? <Main /> : <LoginPage />} />
    </Routes>
    </>
  );
}

export default App;
