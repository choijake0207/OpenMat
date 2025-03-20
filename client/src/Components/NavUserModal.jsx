import React from 'react'
import styles from "../Styles/root.module.css"
import {useAuthStore} from "../Utils/AuthStore"
import { NavLink } from 'react-router-dom'

export default function NavUserModal() {
    const logout = useAuthStore(store => store.logout)
    const auth  = useAuthStore(store => store.auth)
  return (
    <div className={styles.nav_user_modal}>
        <NavLink to={`/profile/${auth.id}`}>Profile</NavLink>
        <NavLink to='/messages'>Messages</NavLink>
        <NavLink to="/saved">Saved</NavLink>
        <NavLink>Host a Mat</NavLink>
        <button onClick={logout}>Log Out</button>
    </div>
  ) 
}

