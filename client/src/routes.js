import React, { useEffect, useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
 import MainLayout from 'hoc/mainLayout';
 import Loader from 'utils/loader';

import Header from 'components/navigation/header'
import Footer from 'components/navigation/footer';
import Home from 'components/home'
import RegisterLogin from 'components/auth';

import UserDashboard from 'components/dashboard';

import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth, userSignOut } from 'store/actions/users.actions';
import authGuard from 'hoc/routeGuard';
import UserInfo from 'components/dashboard/user/info';


function App(props) {

  const [loading, setLoading] = useState(true)
  const user = useSelector(state => state.users);
  console.log(user);
  
  const dispatch = useDispatch();

  const signOutUser  =() =>{
    dispatch(userSignOut())
  }

  useEffect(()=>{
    dispatch(userIsAuth())
  },[dispatch])

  useEffect(()=>{
    if(user.auth !== null){
      setLoading(false)
    }
  },[user])

  return (
    <BrowserRouter>
    {loading ? 
      <Loader full={true}/>
      :
      <>
      <Header
        users= {user}
        signOutUser = {signOutUser}/>
      <MainLayout>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/sign_in" Component={RegisterLogin}/>
        <Route path="/dashboard" Component={authGuard(UserDashboard)}/>
        <Route path="/dashboard/user/user_info" Component={authGuard(UserInfo)}/>
      </Routes>
      </MainLayout>
      <Footer/>
      </>
    }
    </BrowserRouter>
  );
}

export default App;
