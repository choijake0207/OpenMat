import React, { useState } from 'react'
import styles from "../../Styles/hostSetUp.module.css"
import Location from '../HostFormInputs/Location'
import Type from '../HostFormInputs/Type'
import Images from '../HostFormInputs/Images'
import Description from '../HostFormInputs/Description'
import Schedule from '../HostFormInputs/Schedule'
import Title from '../HostFormInputs/Title'
import { useHostFormStore } from '../../Utils/HostFormStore'
import ErrorModal from '../ErrorModal'


export default function Step2({handleNext, handlePrev}) {
  const [error, setError] = useState({status: false, message: null})
  // require data validator
  const step2Valid = () => {
    // getState used to avoid triggering entire step2 rerender
    const data = useHostFormStore.getState().data
    if (
        !data.coordinates || 
        !data.address || 
        data.description === "" || 
        data.scheduleType === "" || 
        data.title === "" || 
        !data.images ||
        !data.type
      ) {
        setError({status: true, message: "Please fill out all fields"})
        return false
    } else if ([...data.images].length < 3) {
        setError({status: true, message: "Please upload at least 3 images"})
        return false
    }
    return true
  }

  const checkStep2 = (e) => {
    e.preventDefault()
    if (step2Valid()) {
      handleNext(e)
    } 
  }

  const confirmError = (e) => {
    e.preventDefault()
    setError({status: false, message: null})
  }

  return (
    <div className={styles.step_2}>
      {
        error.status && <ErrorModal type={"Missing Information"} message={error.message} handleConfirm={(e) => confirmError(e)}/>
      }
      <h2>Listing Details</h2>
      <Title/>
      <Location/>
      <Type/>
      <Images/>
      <Description/>
      <Schedule/>

      <footer className={styles.step_footer}>
          <button className={styles.prev_btn} onClick={(e) => handlePrev(e)}>Go Back</button>
          <button className={styles.next_or_submit_btn} onClick={(e) => checkStep2(e)}>Next</button>
      </footer>
    </div>
  )
}
