  import React from 'react'
  import {Routes, Route, Navigate} from "react-router-dom"
  import Home from './pages/Home'
  import Login from './pages/Login'
import Signup from './pages/Signup'
import ProctectedRoute from './shared/ProctectedRoute'
import AdminLayout from './admin/AdminLayout'
import AdminDashboardPage from './admin/AdminDashboardPage'
import AdminBooksPage from './admin/AdminBooksPage'
import AdminUserPage from './admin/AdminUserPage'
import AdminFinesPage from './admin/AdminFinesPage'
import UserLayout from './user/UserLayout'
import UserDashboardPage from './user/UserDashboardPage'
import UserBooksPage from './user/UserBooksPage'
import UserEditProfilePage from './user/UserEditProfilePage'

  const App = () => {
    return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login/>}/>   
          <Route path='/signup' element={<Signup/>}/>

          {/* Protected Routes */}
          {/* Admin */}
          <Route element={<ProctectedRoute allowedRole="admin"/>}>
          <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace/>} />
          <Route path='dashboard' element={<AdminDashboardPage />} />
          <Route path='books' element={<AdminBooksPage/>} />
          <Route path='users' element={<AdminUserPage />} />
          <Route path='fines' element={<AdminFinesPage />} />
          </Route>
         </Route> 

         <Route element={<ProctectedRoute allowedRole="user" />} >
         <Route path='/user' element={<UserLayout />} >
         <Route index element={<Navigate to="/user/dashboard" replace />} />
         <Route path='dashboard' element={<UserDashboardPage />} />
         <Route path='books' element={<UserBooksPage />} />
         <Route path='profile' element={<UserEditProfilePage />} />
         </Route>
         </Route>

         <Route path='*' element={<Navigate to='/' replace/>} />
      </Routes>
    )
  }

  export default App