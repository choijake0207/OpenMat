import React, {useState, useEffect} from 'react'
import styles from "../../Styles/listing.module.css"
import Leaflet from '../Leaflet'
import { Star, SquaresFour } from 'phosphor-react'
import ImageGallery from './ImageGallery'

export default function Listing({listing, type, hostProfile}) {

    const [galleryOpen, setGalleryOpen] = useState(false)
    // state for animation gallery closing
    const [showGallery, setShowGallery] = useState(false)
 
    useEffect(() => {
        if (galleryOpen) setShowGallery(true)
    }, [galleryOpen])

 

    return (
        <div className={`${styles.listing} ${type === "preview" ? styles.preview : "" }`}>

            {
                showGallery && 
                    <ImageGallery 
                        images={listing.images} 
                        exitGallery={(e) => {
                            e.preventDefault()
                            setGalleryOpen(false)
                            setTimeout(() => setShowGallery(false), 300)       
                        }}
                        isOpen={galleryOpen}
                        type={type}
                    />
            }

            <div className={styles.lp_images}>
                <img className={styles.primary_img} src={URL.createObjectURL([...listing.images][0])}/>
                <div className={styles.secondaries}>
                    <img className={styles.secondary_img} src={URL.createObjectURL([...listing.images][1])}/>
                    <img className={styles.secondary_img} src={URL.createObjectURL([...listing.images][2])}/>
                </div>
                <button 
                    className={styles.view_all_button} 
                    onClick={(e) => {
                        e.preventDefault() 
                        setGalleryOpen(true)
                    }}>
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

            <div className={`${styles.lp_container} ${styles.last}`}>
                <label>Availability</label>
                <div className={styles.listing_availability}>
                    {
                        listing.scheduleType === "Flexible" ?
                            <p>Flexible</p>
                        :
                            
                            listing.scheduleList.map((date) => {
                                return (
                                    <div className={styles.availability_date}>
                                        <p className={styles.day}>{date.day}</p>
                                        <p className={styles.time}>{date.start} - {date.end}</p>
                                    </div>
                                )
                            })
                        
                    }
                </div>
            </div>

            <div className={styles.review_container}>
                <h2 className={styles.review_heading}><Star weight={"fill"}/> No Reviews</h2>
            </div>

        
        </div>
    )
}
