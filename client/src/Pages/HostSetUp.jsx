import React, { useState, useEffect } from 'react'
import styles from "../Styles/hostSetUp.module.css"
import {useAuthStore} from "../Utils/AuthStore"
import {Info, BuildingOffice, HouseLine} from "@phosphor-icons/react"
import { fetchProfile } from '../API/GET'
import Leaflet from '../Components/Leaflet'
import InfoModal from '../Components/InfoModal'

export default function Host() {

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
        
        {step === 0 && <div className={styles.step_0}>
          <section className={styles.intro_section}>
            <div className={styles.section_header}>
              <h2>1</h2>
              <h2>Confirm Your Personal Information</h2>
            </div>
            <p>
              Review your profile information and make sure it's accurate. This will be public for all users to see.
            </p>
          </section>

          <section className={styles.intro_section}>
            <div className={styles.section_header}>
              <h2>2</h2>
              <h2>Add Listing Details</h2>
            </div>
            <p>
              Add 3 or more photos of your mat space plus a description of what you are intending to host the mat space for.
            </p>
          </section>

          <footer className={styles.step_footer}>
            <button className={styles.start_btn} onClick={(e) => nextStep(e)}>Get Started</button>
          </footer>
        </div>}

        {step === 1 && <div className={styles.step_1}>
          <h2>Your Public Profile</h2>
          <div className={styles.step_1_info_box}>
            <Info/> 
            <p>If anything looks incorrect, please go to the profile page and update accordingly before proceeding</p>
          </div>
          <section className={styles.step_1_public_profile}>
            <img src={profile.pfp} alt="profile_picture"/>
            <div className={styles.profile_info}>
              <label>Name
                <p>{profile.firstName} {profile.lastName}</p>
              </label>
              <label>Affiliation
                <p>{profile.affiliation}</p>
              </label>
              <label>Belt
                <p>{profile.belt}</p>
              </label>
            </div>
          </section>

          <footer className={styles.step_footer}>
            <button className={styles.prev_btn} onClick={(e) => prevStep(e)}>Go Back</button>
            <button className={styles.next_or_submit_btn} onClick={(e) => nextStep(e)}>Next</button>
          </footer>
        </div>}


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
              <button className={styles.type_btn}><HouseLine/> Residential</button>
              <button className={styles.type_btn}><BuildingOffice/> Commercial </button>
            </div>
          </div>
          <div className ={styles.list_img}>
            <h3>Upload 3 or more pictures:</h3>
            <ul className={styles.img_previews}>

            </ul>
            <input
              type="file"
              multiple={true}
              image='image/*'
              name="pictures"
              className={styles.img_uploader}
              onChange={(e) => handleChange(e)}
              required
            />
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
            <select value={data.scheduleType} name="scheduleType" onChange={(e) => handleChange(e)} required>
              <option value="">Select Schedule</option>
              <option value="Fixed">Fixed</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <footer className={styles.step_footer}>
            <button className={styles.prev_btn} onClick={(e) => prevStep(e)}>Go Back</button>
            <button className={styles.next_or_submit_btn} onClick={(e) => nextStep(e)}>Next</button>
          </footer>
        </div>}






      </form>

   



    </div>
  )
}
