import React from 'react'
import styles from "../../Styles/hostSetUp.module.css"
import { useHostFormStore } from '../../Utils/HostFormStore'

export default function Title() {
    const title = useHostFormStore(store => store.title)
    const setTitle = useHostFormStore(store => store.setTitle)
  return (
    <div className={styles.listing_title}>
        <h3>Give your listing a short title <span>(25 characters max)</span></h3>
        <input
            type="text"
            placeholder="ex: Garage Gym / Rented-out Judo Dojo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={25}
            required
        />
    </div>
  )
}
