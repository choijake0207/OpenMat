import React from 'react'
import { useHostFormStore } from '../../Utils/HostFormStore'
import styles from "../../Styles/hostSetUp.module.css"

export default function Description() {

    const description = useHostFormStore(store => store.data.description)
    const setDescription = useHostFormStore(store => store.setDescription)





  return (
    <div className={styles.list_description}>
        <h3>Describe your listing</h3>

        <p>Provide users with a short summary about your listing, amenities, extra directions, do's and dont's, or any other helpful information</p>
        <textarea
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            required
        />
    </div>
  )
}
