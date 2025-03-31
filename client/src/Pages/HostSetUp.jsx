import React, { useState, useEffect } from 'react'
import styles from "../Styles/hostSetUp.module.css"
import {useAuthStore} from "../Utils/AuthStore"
import { fetchProfile } from '../API/GET'
import Step0 from '../Components/HostForm/Step0'
import Step1 from '../Components/HostForm/Step1'
import Step2 from '../Components/HostForm/Step2'

export default function Host() {


  const auth = useAuthStore(store => store.auth)
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState()
  const [data, setData] = useState({
    location: "",
    type: "",
    images: null,
    description: "",
    scheduleType: "",
    scheduleList: []
  })

  useEffect(() => {
    if (!auth?.id) return
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await fetchProfile(auth.id)
        setProfile(response)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
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

  const handleChange = (e) => {
    const {name, value, type, files} = e.target
    setData(prev => ({
      ...prev,
      [name]: type === "file" ? files : value
    }))
  }

  const handleTypeChange = (e, type) => {
    e.preventDefault()
    setData(prev => ({
      ...prev,
      type: type
    }))
  }

  const createDate = (e) => {
    e.preventDefault()
    setData(prev => ({
      ...prev,
      scheduleList: [...prev.scheduleList, {day: "", start: "", end: ""}]
    }))
  }

  const setDate = (e, i) => {
    const {value, name} = e.target
    setData(prev => ({
      ...prev,
      scheduleList: prev.scheduleList.map((date, index) => {
        if (i === index) {
          return {
            ...date,
            [name]: value
          }
        } else {
          return date
        }
      })
    }))
  }

  console.log(data)



  if (loading) {
    return <p>...Loading...</p>
  }


  return (
    <div className={styles.host_page}>

      <div className={styles.host_banner}>
        <button className={styles.exit_btn}>Exit</button>
        {step === 0 && <h1>Become a host in just a few steps</h1>}
        {step !== 0 && <h1>Step {step}</h1>}
      </div>

      <form className={styles.host_form}>
        
        {step === 0 && <Step0 handleNext={(e) => nextStep(e)}/>}

        {step === 1 && <Step1 profile={profile} handleNext={(e) => nextStep(e)} handlePrev={(e) => handlePrev(e)}/>}

        {step === 2 && 
          <Step2 
            data={data} 
            handleNext={(e) => nextStep(e)} 
            handlePrev={(e) => prevStep(e)} 
            change={(e) => handleChange(e)}
            typeChange={(e, type) => handleTypeChange(e, type)}
            handleCreateDate={(e) => createDate(e)}
            handleSetDate={(e, i) => setDate(e, i)}
          />
        }

      </form>
    </div>
  )
}
