import React from 'react'
import styles from "../../Styles/hostSetUp.module.css"

export default function Step0({handleNext}) {
  return (
    <div className={styles.step_0}>
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
        <button className={styles.start_btn} onClick={(e) => handleNext(e)}>Get Started</button>
        </footer>
    </div>
  )
}
