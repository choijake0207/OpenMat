import React, {useState, useEffect} from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuthStore } from '../Utils/AuthStore'
import SignUpModal from '../Components/SignUpModal'
import LoginModal from '../Components/LoginModal'
import NavUserModal from '../Components/NavUserModal'
import styles from "../Styles/root.module.css"
import {ChatCircleDots, List, House, MagnifyingGlass, User, BookmarkSimple, Book} from "phosphor-react"

export default function RootLayout() {

    const [registerModalOn, setRegisterModalOn] = useState(false)
    const [loginModalOn, setLoginModalOn] = useState(false)
    const [navModalOn, setNavModalOn] = useState(false)
    const [loadingCheck, setLoadingCheck] = useState(false)

    const auth = useAuthStore(store => store.auth)
    const authCheck = useAuthStore(store => store.authCheck)

    useEffect(() => {
        const check = async() => {
            try {
                setLoadingCheck(true)
                await authCheck()
            } catch (error) {
                console.error(error)
            } finally {
                setLoadingCheck(false)
            }
        }
        check()
    }, [])

    // create custom loader later
    if (loadingCheck) {
        return <p>...Loading...</p>
    }

    return (
    <div className={styles.root_layout}>
        <header className={styles.root_header}>

            <div className={styles.logo_container}>
                <img src="/OpenMatLogo.png" className={styles.logo_img} alt="logo"/>
                <p className={styles.logo_text}>OpenMat</p>
            </div>

            <nav className={styles.root_nav}>
                <NavLink 
                    to="/" 
                    className={({ isActive }) => (isActive ? styles.active : "")}
                > Home </NavLink>
                <NavLink 
                    to="/explore" 
                    className={({ isActive }) => (isActive ? styles.active : "")}
                > Explore </NavLink>

                {
                    auth.isAuthorized &&
                    <NavLink to="/saved" className={({ isActive }) => (isActive ? styles.active : "")}>Saved</NavLink>
                }
            </nav>

            <div className={styles.user_links}>

                {auth.isAuthorized
                    ? <>
                        <NavLink className={styles.host_link}>Be a Host</NavLink>
                        <NavLink className={styles.chat_link}><ChatCircleDots/></NavLink>
                        <button 
                            className={styles.nav_username_btn}
                            onClick={() => setNavModalOn(!navModalOn)}
                        >
                            <List/>
                            <img src={auth.pfp}/>
                  
                        </button>

                    </>
                    : <>
                        <button onClick={() => setRegisterModalOn(true)}>Sign Up</button>
                        <button onClick={() => setLoginModalOn(true)}>Login</button>
                    </>
                }

            </div>

            {
                navModalOn && <NavUserModal closeModal={() => setNavModalOn(false)}/>
            }

        </header>

        <Outlet/>

        {
            registerModalOn && 
                <SignUpModal 
                    closeModal={() => setRegisterModalOn(false)}
                    switchModal={() => setLoginModalOn(true)}
                    pageMode={false}
                />
        }
        {
            loginModalOn && 
                <LoginModal 
                    closeModal={() => setLoginModalOn(false)}
                    switchModal={() => setRegisterModalOn(true)}
                    pageMode={false}
                />
        }
      
        <nav className={styles.mobile_nav_600}>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}><House/> Home</NavLink>
            <NavLink to="/explore" className={({ isActive }) => (isActive ? styles.active : "")}><MagnifyingGlass/> Explore</NavLink>
            {
                auth.isAuthorized ? 
                    <>
                        <NavLink to="/messages" className={({ isActive }) => (isActive ? styles.active : "")}><ChatCircleDots/> Messages</NavLink>
                        <NavLink to={`/profile/${auth.id}`} className={({ isActive }) => (isActive ? styles.active : "")}><User/> Profile</NavLink>
                        <NavLink to="/saved" className={({ isActive }) => (isActive ? styles.active : "")}><BookmarkSimple/> Saved</NavLink>
                    </>
                :
                    <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : "")}><User/> Log In</NavLink>

            }
          
        </nav>
    </div>
  )
}
