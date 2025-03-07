import React from 'react'
import styles from "../Styles/landing.module.css"
import LandingSearchBar from '../Components/LandingSearchBar'

export default function Landing() {
  return (
    <div className={styles.landing_page}>
      <section className={styles.greeting_banner}>
        <h1 className={styles.greeting_msg}>OpenMat, a community for jiu-jitsu lovers by jiu-jitsu lovers</h1>
        <p>Get Started By Searching</p>
        <LandingSearchBar/>
      </section>
      <section className={styles.landing_info}></section>
    </div>
  )
}
