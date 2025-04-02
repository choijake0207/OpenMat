import React from 'react'
import styles from "../../Styles/listingPreview.module.css"
import Leaflet from '../Leaflet'
import { Star, SquaresFour } from 'phosphor-react'

export default function ListingPreview({listing, type, hostProfile}) {
    console.log(listing)
  return (
    <div className={styles.listing_preview}>
        <div className={styles.lp_images}>
            <img className={styles.primary_img} src={URL.createObjectURL([...listing.images][0])}/>
            <div className={styles.secondaries}>
                <img className={styles.secondary_img} src={URL.createObjectURL([...listing.images][1])}/>
                <img className={styles.secondary_img} src={URL.createObjectURL([...listing.images][2])}/>
            </div>
            <button className={styles.view_all_button}>
                <SquaresFour/>
                View All
            </button>
        </div>
        <div className={styles.lp_header}>
            <h1 className={styles.header_title}>{listing.title}</h1>
            <p className={styles.header_location}>{listing.address.city}, {listing.address.state}</p>
            <p className={styles.header_reviews}><Star weight={"fill"}/>No Reviews</p>
            <div className={styles.host_profile}>
                <img className={styles.host_profile_pfp} src={hostProfile.pfp}/>
                <div className={styles.profile_details}>
                    <p className={styles.profile_firstName}>Hosted By {hostProfile.firstName}</p>
                    <p className={styles.profile_experience}>{hostProfile.belt} belt {hostProfile.affiliation !== "Nomad" && `@ ${hostProfile.affiliation}` }</p>
                </div>
            </div>
        </div>
        <div className={styles.lp_container}>
            <label>Description</label>
            <p className={styles.lp_description}>{listing.description}</p>
        </div>
        <div className={styles.lp_container}>
            <label>Location</label>
            <div className={styles.lp_map}>
                <Leaflet center={[listing.coordinates.lat, listing.coordinates.lon]} zoom={15} />
            </div>
        </div>

      
    </div>
  )
}
