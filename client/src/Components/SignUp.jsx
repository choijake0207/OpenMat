import React, {useState} from 'react'
import styles from "../Styles/signUp.module.css"
import {X} from "phosphor-react"
import { useAuthStore } from '../Utils/AuthStore'

export default function SignUp({closeModal}) {

    const [formStep, setFormStep] = useState(1)
    const [submitting, setSubmitting] = useState(false)
    const [data, setData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        belt: "",
        affiliation: "",
        bio: "",
        pfp: null
    })

    const step1Valid = 
        data.email !== "" &&
        data.firstName !== "" &&
        data.lastName !== "" &&
        data.password !== ""

    const step2Valid = data.belt !== ""
        
    const nextStep = (e) => {
        e.preventDefault()
        setFormStep(prev => prev + 1)
    }
    const prevStep = (e) => {
        e.preventDefault()
        setFormStep(prev => prev - 1)
    }

    const handleChange = (e) => {
        const {name, value, type, files} = e.target
        setData(prev => ({
            ...prev,
            [name]: type === "file" ? files[0] : value
        }))
    }
  

    const handleClose = (e) => {
        e.preventDefault()
        closeModal()
    }

    const register = useAuthStore(store => store.register) 

    const handleRegister = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("pfp", data.pfp)
        formData.append("email", data.email)
        formData.append("firstName", data.firstName)
        formData.append("lastName", data.lastName)
        formData.append("password", data.password)
        formData.append("belt", data.belt)
        formData.append("bio", data.bio)
        formData.append("affiliation", data.affiliation)
        try {
            setSubmitting(true)
            const response = await register(formData)
            closeModal()
        } catch (error) {
            console.error(error)
        } finally {
            setSubmitting(false)
        }
    } 


  return (
    <div className={styles.modal_wrap}>
        <form className={styles.signup_modal_form}>

           {formStep === 1 && 
                <div className={styles.step_1}>
                    <div className={styles.form_header}>
                        <h1>Sign up to start exploring</h1>
                        <button className={styles.close_modal_btn} onClick={(e) => handleClose(e)}><X/></button>
                    </div>
                    <label className={styles.email_field}>
                        Email
                        <input 
                            type="email" 
                            name="email"
                            value={data.email}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                    <div className={styles.name_fields}>
                        <label>
                            First Name
                            <input 
                                type="text" 
                                name="firstName"
                                value={data.firstName}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </label>
                        <label>
                            Last Name
                            <input 
                                type="text" 
                                name="lastName"
                                value={data.lastName}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </label>
                    </div>
                    <label>
                        Create Password
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </label>
                    <button className={styles.next_or_submit_btn} disabled={!step1Valid} onClick={(e) => nextStep(e)}>Next</button>
                </div>
            }

            {formStep === 2 &&
                <div className={styles.step_2}>
                    <label>
                        Gym Affiliation (optional)
                        <input 
                            type="text" 
                            placeholder="Gracie Barra, 10th Planet, etc..."
                            name="affiliation"
                            value={data.affiliation}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                    <label>
                        Belt 
                        <select
                            name="belt"
                            value={data.belt}
                            onChange={(e) => handleChange(e)}
                            required
                        >   
                            <option value="">Select Belt</option>
                            <option value="Unranked">Unranked</option>
                            <option value="White">White</option>
                            <option value="Blue">Blue</option>
                            <option value="Purple">Purple</option>
                            <option value="Brown">Brown</option>
                            <option value="Black">Black</option>
                        </select>
                    </label>
                    <div className={styles.step_btn_container}>
                        <button className={styles.prev_btn} onClick={(e) => prevStep(e)}>Go Back</button>
                        <button className={styles.next_or_submit_btn} disabled={!step2Valid} onClick={(e) => nextStep(e)}>Next</button>
                    </div>
                </div>
            }

            {formStep === 3 &&
                <div className={styles.step_3}>
                    <label>
                        Bio (optional)
                        <textarea
                            name="bio"
                            value={data.bio}
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                    <label>
                        Upload a profile picture (optional)
                        <br></br>
                        Max: 5mb
                        <input 
                            type="file"
                            accept='image/*'
                            multiple={false}
                            name="pfp"
                            onChange={(e) => handleChange(e)}
                        />
                    </label>
                    <div className={styles.step_btn_container}>
                        <button className={styles.prev_btn} onClick={(e) => prevStep(e)}>Go Back</button>
                        <button className={styles.next_or_submit_btn} onClick={(e) => handleRegister(e)} disabled={submitting}>Submit</button>
                    </div>
                </div>
            }

            <div className={styles.form_footer}>
                <p>Already Have An Account? Login here!</p>
            </div>
        </form>
    </div>
  )
}
