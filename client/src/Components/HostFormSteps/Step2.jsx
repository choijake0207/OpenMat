import React from 'react'
import styles from "../../Styles/hostSetUp.module.css"
import Location from '../HostFormInputs/Location'
import Type from '../HostFormInputs/Type'
import Images from '../HostFormInputs/Images'
import Description from '../HostFormInputs/Description'
import Schedule from '../HostFormInputs/Schedule'
import Title from '../HostFormInputs/Title'
import { useHostFormStore } from '../../Utils/HostFormStore'

// Need to component-tize form elements
// Too many inputs and too many rerenders 
// Use custom hook or zustand store in each component to set form data state

export default function Step2({handleNext, handlePrev}) {



  return (
    <div className={styles.step_2}>
        <h2>Listing Details</h2>
        <Title/>
        <Location/>
        <Type/>
        <Images/>
        <Description/>
        <Schedule/>

        <footer className={styles.step_footer}>
            <button className={styles.prev_btn} onClick={(e) => handlePrev(e)}>Go Back</button>
            <button className={styles.next_or_submit_btn} onClick={(e) => handleNext(e)}>Next</button>
        </footer>
    </div>
  )
}
