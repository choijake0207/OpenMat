import React, {useState} from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuthStore } from '../Utils/AuthStore'
import SignUp from '../Components/SignUp'
import styles from "../Styles/root.module.css"

export default function RootLayout() {

    const [registerModalOn, setRegisterModalOn] = useState(false)
    const auth = useAuthStore(store => store.auth)
    console.log(auth)

  return (
    <div className={styles.root_layout}>
        <header className={styles.root_header}>
            <div className={styles.logo_container}>
                <img src="/OpenMatLogo.png" className={styles.logo_img} alt="logo"/>
                <p className={styles.logo_text}>OpenMat</p>
            </div>
            <nav className={styles.root_nav}>
                <Link to="/">Home</Link>
                <Link to="/explore">Explore</Link>
                <Link>Be a Host</Link>
            </nav>
            <div className={styles.user_links}>
                <button onClick={() => setRegisterModalOn(true)}>Sign Up</button>
            </div>
        </header>

        <Outlet/>

        {
            registerModalOn && <SignUp closeModal={() => setRegisterModalOn(false)}/>
        }
      
    </div>
  )
}
