import React, {useState} from 'react'
import { useNavigate } from 'react-router'
import styles from "../Styles/loginModal.module.css"
import { X } from 'phosphor-react'
import {useAuthStore} from "../Utils/AuthStore"

export default function LoginModal({closeModal, switchModal, pageMode}) {

    const [submitting, setSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleClose = (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    
    const handleSwitch = (e) => {
        e.preventDefault()
        if(!pageMode) {
            closeModal()
        }
        switchModal()
    }
    
    const login = useAuthStore((store) => store.login)
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setSubmitting(true)
            await login(formData)
        } catch (error) {
            console.error
        } finally {
            setSubmitting(false)
            if (!pageMode) {
                closeModal()
            } else {
                navigate("/")
            }
        }
    }
 

  return (
    <div className={`${styles.modal_wrap} ${pageMode === true ? styles.page_mode : styles.modal_mode}`}>
        <form className={styles.login_modal_form}>
            <div className={styles.form_header}>
                    <h1>Welcome Back</h1>
                    {!pageMode && <button className={styles.close_modal_btn} onClick={(e) => handleClose(e)}><X/></button>}
            </div>
            <label>
                Email
                <input
                    type="email"
                    onChange={(e) => handleChange(e)}
                    value={formData.email}
                    name="email"
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    onChange={(e) => handleChange(e)}
                    value={formData.password}
                    name="password"
                />
            </label>
            <button className={styles.submit_btn} onClick={(e) => handleLogin(e)} disabled={submitting}>Login</button>
     
            <div className={styles.form_footer}>
                <p>
                    Don't Have An Account? Sign Up <button className={styles.redirect_modal_link} onClick={(e) => handleSwitch(e)}>here!</button>
                </p>
            </div>
        </form>
    </div>
  )
}
