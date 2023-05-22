import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../components/Header/Header';
import PrivateRoutes from '../utils/PrivateRoutes';

import { userData } from '../redux/authSlice/authSlice';

import { useEffect,Suspense } from 'react';
import { HomePageLazy } from '../pages/Home/Home.async';
import { NotFoundPageLazy } from '../pages/NotFound/NotFound.async';
import { ProfilePageLazy } from '../pages/Profile/Profile.async';
import { RegistrationPageLazy } from '../pages/Registration/Registration.async';
import { SigninPageLazy } from '../pages/Signin/Signin.async';
import { SuccessRegistrationPageLazy } from '../pages/SuccessRegistration/SuccessRegistration.async';
import './App.css';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('userData'))) {
      axios.get('http://localhost:3000/db.json')
        .then(res => {
          const result = res.data.find(i => i.username === JSON.parse(localStorage.getItem('userData')));
          dispatch(userData(result))
        })
        .catch(err => console.log(err))
    }
  }, [])

  return (
    <div className="app">
      <Header />
      <Suspense fallback=''>
      <main>
        <Routes>
          <Route element={<HomePageLazy />} path="/" />
          <Route element={<RegistrationPageLazy />} path="/registration" />
          <Route element={<PrivateRoutes />}>
            <Route element={<ProfilePageLazy />} path="/profile" />
          </Route>
          <Route element={<SigninPageLazy />} path="/signin" />
          <Route element={<SuccessRegistrationPageLazy />} path="/success" />
          <Route element={<NotFoundPageLazy />} path="*" />
        </Routes>
      </main>
      </Suspense>
    </div>
  );
}

export default App;
