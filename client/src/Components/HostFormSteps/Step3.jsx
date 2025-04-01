import React from 'react'
import styles from "../../Styles/hostSetUp.module.css"
import { useHostFormStore } from '../../Utils/HostFormStore'
import ListingPreview from './ListingPreview'

export default function Step3({handlePrev, hostProfile}) {
    const data = useHostFormStore(store => store.data)
  return (
    <div className={styles.step_3}>
        <h2>Review Listing</h2>
        <ListingPreview listing={data} type={"private"} hostProfile={hostProfile}/>
        <footer className={styles.step_footer}>
            <button className={styles.prev_btn} onClick={(e) => handlePrev(e)}>Go Back</button>
            <button className={styles.next_or_submit_btn} onClick={(e) => handleNext(e)}>Publish</button>
        </footer>
    </div>
  )
}
