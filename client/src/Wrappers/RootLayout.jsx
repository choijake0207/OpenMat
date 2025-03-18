import React, {useState, useEffect} from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuthStore } from '../Utils/AuthStore'
import SignUp from '../Components/SignUp'
import Login from '../Components/Login'
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
                <NavLink to="/">Home</NavLink>
                <NavLink to="/explore">Explore</NavLink>
                {
                    auth.isAuthorized &&
                    <NavLink>Saved</NavLink>
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
                            {auth.firstName}
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
                <SignUp 
                    closeModal={() => setRegisterModalOn(false)}
                    switchModal={() => setLoginModalOn(true)}
                />
        }
        {
            loginModalOn && 
                <Login 
                    closeModal={() => setLoginModalOn(false)}
                    switchModal={() => setRegisterModalOn(true)}
                />
        }
      
        <nav className={styles.mobile_nav_600}>
            <NavLink to="/"><House/> Home</NavLink>
            <NavLink to="/explore"><MagnifyingGlass/> Explore</NavLink>
            <NavLink><ChatCircleDots/> Messages</NavLink>
            <NavLink><User/> Profile</NavLink>
            <NavLink><BookmarkSimple/> Saved</NavLink>
        </nav>
    </div>
  )
}
