import React from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import styles from "../Styles/root.module.css"

export default function RootLayout() {
  return (
    <div className={styles.root_layout}>
        <header className={styles.root_header}>
            <div className={styles.logo_container}>
                <img src="../../public/OpenMatLogo.png" className={styles.logo_img} alt="logo"/>
                <p className={styles.logo_text}>OpenMat</p>
            </div>
            <nav className={styles.root_nav}>
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link>Be a Host</Link>
            </nav>
            <div className={styles.user_links}>
                <p>Username</p>
            </div>
        </header>

        <Outlet/>
      
    </div>
  )
}
