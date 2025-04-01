import React from 'react'
import styles from "../../Styles/hostSetUp.module.css"
import { Info } from 'phosphor-react'

export default function Step1({profile, handleNext, handlePrev}) {
  return (
    <div className={styles.step_1}>
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
            <button className={styles.prev_btn} onClick={(e) => handlePrev(e)}>Go Back</button>
            <button className={styles.next_or_submit_btn} onClick={(e) => handleNext(e)}>Next</button>
          </footer>
    </div>
  )
}
