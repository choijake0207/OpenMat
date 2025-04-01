import React, {useEffect, useState} from 'react'
import InfoModal from '../InfoModal'
import { Info, PlusCircle, X } from 'phosphor-react' 
import { BuildingOffice, HouseLine } from '@phosphor-icons/react/dist/ssr'
import Leaflet from '../Leaflet'
import styles from "../../Styles/hostSetUp.module.css"
import { geoLocate } from '../../API/GET'
import Loader from '../Loader'
import {times, states} from "../../Utils/HostFormData"

// Need to component-tize form elements
// Too many inputs and too many rerenders 
// Use custom hook or zustand store in each component to set form data state

export default function Step2({
    data, 
    handleNext, 
    handlePrev, 
    handleAddress,
    change, 
    typeChange, 
    handleCreateDate, 
    handleSetDate, 
    handleRemoveDate,
    handleLocation,
    center
}) {


    const [infoModal, setInfoModal] = useState(false)
    const [locationInput, setLocationInput ] = useState("")
    const [loadingGeoCode, setLoadingGeoCode] = useState(false)
    const [geoCodeError, setGeoCodeError] = useState({status: false, message: null})
    

    const fetchCoords = async(e) => {
        e.preventDefault()
        try {
            setLoadingGeoCode(true)
            const response = await geoLocate(locationInput)
            // API doesn't return error for invalid input but just null feature array
            if (response.features.length === 0) {
                setGeoCodeError({
                    status: true,
                    message: "Sorry, we don't recognize that address. Please type out the full street address, city, and state."
                })
            } else {
                setGeoCodeError({
                    status: false
                })
                console.log(response)
                handleAddress({
                    street: response.features[0].properties.address_line1,
                    city: response.features[0].properties.city,
                    state: response.features[0].properties.state,
                    zip: response.features[0].properties.postcode,
                    country: response.features[0].properties.country
                })
                handleLocation({lat: response.features[0].properties.lat, lon: response.features[0].properties.lon})
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingGeoCode(false)
        }
    }


  return (
    <div className={styles.step_2}>
        <h2>Listing Details</h2>

        <div className={styles.list_location}>
            <h3>Where is your listing located? <Info onClick={()=> setInfoModal(!infoModal)}/>
                {infoModal && 
                    <InfoModal 
                        header={"Privacy Notice"} 
                        text={"OpenMat will never disclose your exact address to users."}
                    />
                }
            </h3>
            <div className={styles.location_search_box}>
                <input
                    type="text"
                    className={styles.location_input}
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder='Street / City / State'
                />
            
                <button className={styles.save_button} onClick={(e) => fetchCoords(e)} disabled={loadingGeoCode}>
                    {loadingGeoCode ? <Loader type="button"/> : "Save"}
                </button>
            </div>
            {geoCodeError.status &&
                <p className={styles.location_search_error}>{geoCodeError.message}</p>
            }
            <div className={styles.location_result}>

            </div>
            <div className={styles.list_map}>
                <Leaflet
                    center={center ?? [0,0]}
                    zoom={15}
                />
            </div>
        </div>


        <div className={styles.list_type}>
            <h3>Which describes your listing facility?</h3>
            <div className={styles.list_type_btns}>
                <button 
                className={`${styles.type_btn} ${data.type === "Residential" ? styles.active_type: ""}`}
                onClick={(e) => typeChange(e, "Residential")}
                ><HouseLine/> Residential</button>
                <button 
                className={`${styles.type_btn} ${data.type === "Commercial" ? styles.active_type: ""}`}
                onClick={(e) => typeChange(e, "Commercial")}
                ><BuildingOffice/> Commercial </button>
            </div>
        </div>


        <div className ={styles.list_img}>
            <h3>Upload 3 or more pictures:</h3>
            {data.images && 
                <ul className={styles.img_previews}>
                    {
                        [...data.images].map((file, i) => {
                        
                        return (
                            <li key={i} className={styles.preview_img}>
                            <img src={URL.createObjectURL(file)}/>
                            </li>
                        )
                        })
                    }
                </ul>
            }
            <label className={styles.custom_uploader}>
                {data.images === null ? "Upload Images" :" Replace Images"}
                <input
                type="file"
                multiple={true}
                image='image/*'
                name="images"
                className={styles.img_uploader}
                onChange={(e) => change(e)}
                required
                />
            </label>
        </div>


        <div className={styles.list_description}>
            <h3>Describe your listing</h3>
            <p>Provide users with a short summary about your listing, amenities, extra directions, do's and dont's, or any other helpful information</p>
            <textarea
                value={data.description}
                name="description"
                onChange={(e) => change(e)}
                required
            />
        </div>
        

        <div className={styles.list_scheduling}>
            <h3>What is your availability?</h3>
            <select value={data.scheduleType} name="scheduleType" className={styles.scheduling_type_picker} onChange={(e) => change(e)} required>
                <option value="">Select Schedule</option>
                <option value="Fixed">Fixed</option>
                <option value="Flexible">Flexible</option>
            </select>
            {
                data.scheduleType === "Fixed" &&
                    <div className={styles.schedule_list}>
                        {
                            data.scheduleList.length > 0 && data.scheduleList.map((date, i) => {
                                return (
                                    <div className={styles.date_input} key={date.id}>
                                        <label>
                                            Day
                                            <select className={styles.day_picker} name="day" onChange={(e) => handleSetDate(e, i)}>
                                                <option value="">Day</option>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                                <option value="Sunday">Sunday</option>
                                            </select>
                                        </label>
                                        <label>
                                            Start
                                            <select className={styles.start_picker} name="start" onChange={(e) => handleSetDate(e, i)}>
                                                <option value="">--</option>
                                                {
                                                    times.map((time, i) => {
                                                    return (
                                                        <option key={i} value={time}>{time}</option>
                                                    )
                                                    })
                                                }
                                            </select>
                                        </label>
                                        <label>
                                            End
                                            <select className={styles.end_picker} name="end" onChange={(e) => handleSetDate(e, i)}>
                                                <option value="">--</option>
                                                {
                                                    times.map((time, i) => {
                                                    return (
                                                        <option key={i} value={time}>{time}</option>
                                                    )
                                                    })
                                                }
                                            </select>
                                        </label>
                                        <button className={styles.delete_date_btn} onClick={(e) => handleRemoveDate(e, i)}><X/></button>
                                    </div>
                                )
                            })
                        }
                    <button className={styles.add_date_btn} onClick={(e) => handleCreateDate(e)}><PlusCircle/>Add Date</button>
                </div>
            }
        </div>

        <footer className={styles.step_footer}>
            <button className={styles.prev_btn} onClick={(e) => handlePrev(e)}>Go Back</button>
            <button className={styles.next_or_submit_btn} onClick={(e) => handleNext(e)}>Next</button>
        </footer>
    </div>
  )
}
