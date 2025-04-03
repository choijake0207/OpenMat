import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from "../../Styles/hostSetUp.module.css"
import { useHostFormStore } from '../../Utils/HostFormStore'
import ListingCard from "../Listing/ListingCard"
import { createListing } from '../../API/POST'
import Loader from '../Loader'

export default function Step3({handlePrev, hostProfile}) {

  const data = useHostFormStore(store => store.data)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleCreate = async(e) => {
    // strinify JSOn objects
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("coordinates", JSON.stringify(data.coordinates))
    formData.append("address", JSON.stringify(data.address))
    formData.append("type", data.type)
    Array.from(data.images).forEach(image => {
      formData.append("images", image)
    })
    formData.append("description", data.description)
    formData.append("scheduleType", data.scheduleType)
    formData.append("scheduleList", JSON.stringify(data.scheduleList))
    try {
      setSubmitting(true)
      const response = await createListing(formData)
      navigate(`/listing/${response.listingId}`)
      console.log(response)
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.step_3}>
        <h2>What Users Will See</h2>
        <ListingCard listing={data} type={"preview"} hostProfile={hostProfile}/>
        <footer className={styles.step_footer}>
            <button className={styles.prev_btn} disabled={submitting} onClick={(e) => handlePrev(e)}>Go Back</button>
            <button className={styles.next_or_submit_btn} disabled={submitting} onClick={(e) => handleCreate(e)}>
              {
                submitting ? <Loader type={"button"}/> : "Publish"
              }
            </button>
        </footer>
    </div>
  )
}
