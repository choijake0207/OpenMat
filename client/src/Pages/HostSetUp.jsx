import React, { useState, useEffect } from 'react'
import styles from "../Styles/hostSetUp.module.css"
import {useAuthStore} from "../Utils/AuthStore"
import { fetchProfile } from '../API/GET'
import Step0 from '../Components/HostFormSteps/Step0'
import Step1 from '../Components/HostFormSteps/Step1'
import Step2 from '../Components/HostFormSteps/Step2'
import Loader from '../Components/Loader'

export default function Host() {


  const auth = useAuthStore(store => store.auth)
  const [step, setStep] = useState(0)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profile, setProfile] = useState()

  useEffect(() => {
    if (!auth?.id) return
    const fetch = async () => {
      try {
        setProfileLoading(true)
        const response = await fetchProfile(auth.id)
        setProfile(response)
      } catch (error) {
        console.error(error)
      } finally {
        setProfileLoading(false)
      }
    }
    fetch()
  }, [auth?.id])

  const nextStep = (e) => {
    e.preventDefault()
    setStep(prev => prev + 1)
  }
  const prevStep = (e) => {
    e.preventDefault()
    setStep(prev => prev - 1)
  }  

  if (profileLoading) {
    return <Loader type={"page"}/>
  }


  return (
    <div className={styles.host_page}>

      <div className={styles.host_banner}>
        <button className={styles.exit_btn}>Exit</button>
        {step === 0 ? <h1>Become a host in just a few steps</h1> : <h1>Step {step}</h1>}
      </div>

      <form className={styles.host_form}>
        
        {step === 0 && 
          <Step0 
            handleNext={(e) => nextStep(e)}
          />
        }

        {step === 1 && 
          <Step1 
            profile={profile} 
            handleNext={(e) => nextStep(e)} 
            handlePrev={(e) => prevStep(e)}
          />
        }
        {step === 2 && 
          <Step2 
            handleNext={(e) => nextStep(e)} 
            handlePrev={(e) => prevStep(e)} 
          />
        }

      </form>
    </div>
  )
}
