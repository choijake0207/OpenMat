import React from 'react'
import styles from "../../Styles/hostSetUp.module.css"

export default function Step0({handleNext}) {
  return (
    <div className={styles.step_0}>

        <section className={styles.intro_section}>
            <div>
                <h2 className={styles.section_header}>1. Confirm Your Personal Information</h2>
                <p>
                    Review your profile information and make sure it's accurate for public view.
                </p>
            </div>
            <img src="/file.png" alt="file_icon"/>
        </section>

        <section className={styles.intro_section}>
            <div>
                <h2 className={styles.section_header}>2. Add Listing Details</h2>
                <p>
                    Add 3 or more photos of your mat space plus a brief description your mat space.
                </p>
            </div>
            <img src="/plans.png" alt="plans_icon"/>
        </section>

        <section className={styles.intro_section}>
            <div>
                <h2 className={styles.section_header}>3. Review Your Listing</h2>
                <p>
                    Review your listing's details and then publish!
                </p>            
            </div>
            <img src="/confirmation.png" alt="confirm_icon"/>
        </section>

        <footer className={styles.step_footer}>
        <button className={styles.start_btn} onClick={(e) => handleNext(e)}>Get Started</button>
        </footer>
    </div>
  )
}
