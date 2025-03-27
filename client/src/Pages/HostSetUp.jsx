import React, { useState, useEffect } from 'react'
import styles from "../Styles/hostSetUp.module.css"
import {useAuthStore} from "../Utils/AuthStore"
import {Info, BuildingOffice, HouseLine, X} from "@phosphor-icons/react"
import { fetchProfile } from '../API/GET'
import Leaflet from '../Components/Leaflet'
import InfoModal from '../Components/InfoModal'
import { PlusCircle } from 'phosphor-react'
import Step0 from '../Components/HostForm/Step0'
import Step1 from '../Components/HostForm/Step1'

export default function Host() {

  const times = [
     "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", 
     "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm",
    "9:00pm", "10:00pm", "All Day"

  ]
  const auth = useAuthStore(store => store.auth)
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState()
  const [infoModal, setInfoModal] = useState(false)
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

  const setDate = (e, i, name) => {
    const {value} = e.target
    setData(prev => ({
      ...prev,
      scheduleList: prev.scheduleList.map((date, index) => {
        if (i === index) {
          return {
            ...date,
            [name]: value
          }
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

        {step === 2 && <div className={styles.step_2}>

          <h2>Listing Details</h2>

          <div className={styles.list_location}>
            <h3>Where is your listing located? <Info onClick={()=> setInfoModal(!infoModal)}/>
              {infoModal && <InfoModal 
                header={"Privacy Notice"} 
                text={"OpenMat will never disclose your exact address to users."}
              />}
            </h3>
            <input
              type="text"
              className={styles.location_input}
              value={data.location}
              name="location"
              onChange={(e) => handleChange(e)}
              required
            />
            <div className={styles.list_map}>
              <Leaflet/>
            </div>
          </div>

          <div className={styles.list_type}>
            <h3>Which describes your listing facility?</h3>
            <div className={styles.list_type_btns}>
              <button 
                className={`${styles.type_btn} ${data.type === "Residential" ? styles.active_type: ""}`}
                onClick={(e) => handleTypeChange(e, "Residential")}
              ><HouseLine/> Residential</button>
              <button 
                className={`${styles.type_btn} ${data.type === "Commercial" ? styles.active_type: ""}`}
                onClick={(e) => handleTypeChange(e, "Commercial")}
              ><BuildingOffice/> Commercial </button>
            </div>
          </div>

          <div className ={styles.list_img}>
            <h3>Upload 3 or more pictures:</h3>
            {data.images && <ul className={styles.img_previews}>
                {
                  [...data.images].map((file, i) => {
                    
                    return (
                      <li key={i} className={styles.preview_img}>
                        <img src={URL.createObjectURL(file)}/>
                      </li>
                    )
                  })
                }
            </ul>}
            <label className={styles.custom_uploader}>
              {data.images === null ? "Upload Images" :" Replace Images"}
              <input
                type="file"
                multiple={true}
                image='image/*'
                name="images"
                className={styles.img_uploader}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
          </div>

          <div className={styles.list_description}>
            <h3>Describe your listing</h3>
            <p>Provide users with a short summary about your listing, amenities, extra directions, do's and dont's, or any other helpful information</p>
            <textarea
              value={data.description}
              name="description"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>

          <div className={styles.list_scheduling}>
            <h3>What is your availability?</h3>
            <select value={data.scheduleType} name="scheduleType" className={styles.scheduling_type_picker} onChange={(e) => handleChange(e)} required>
              <option value="">Select Schedule</option>
              <option value="Fixed">Fixed</option>
              <option value="Flexible">Flexible</option>
            </select>
            {
              data.scheduleType === "Fixed" &&
              <div className={styles.schedule_list}>
                {
                  data.scheduleList.length > 0 && data.scheduleList.map((date, i) => {
                    return (
                      <div className={styles.date_input} key={i}>
                        <label>
                          Day
                          <select className={styles.day_picker} name="day" onChange={(e) => setDate(e, i)}>
                            <option value="">Choose Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                        </label>
                        <label>
                          Start
                          <select className={styles.start_picker} name="start" onChange={(e) => setDate(e, i)}>
                            {
                              times.map((time, i) => {
                                return (
                                  <option key={i} value={time}>{time}</option>
                                )
                              })
                            }
                          </select>
                        </label>
                        <label>
                          End
                          <select className={styles.end_picker} name="end" onChange={(e) => setDate(e, i)}>
                            {
                              times.map((time, i) => {
                                return (
                                  <option key={i} value={time}>{time}</option>
                                )
                              })
                            }
                          </select>
                        </label>
                        <button className={styles.delete_date_btn}><X/></button>
                      </div>
                    )
                  })
                }
                <button onClick={(e) => createDate(e)}><PlusCircle/>Add Date</button>
              </div>
            }
            </div>

            <footer className={styles.step_footer}>
              <button className={styles.prev_btn} onClick={(e) => prevStep(e)}>Go Back</button>
              <button className={styles.next_or_submit_btn} onClick={(e) => nextStep(e)}>Next</button>
            </footer>
          </div>
        }

      </form>
    </div>
  )
}
