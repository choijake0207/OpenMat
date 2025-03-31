import React, {useState} from 'react'
import InfoModal from '../InfoModal'
import { Info, PlusCircle, X } from 'phosphor-react' 
import { BuildingOffice, HouseLine } from '@phosphor-icons/react/dist/ssr'
import Leaflet from '../Leaflet'
import styles from "../../Styles/hostSetUp.module.css"

export default function Step2({data, handleNext, handlePrev, change, typeChange, handleCreateDate, handleSetDate}) {

    const times = [
        "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", 
        "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm",
       "9:00pm", "10:00pm", "All Day"
   
    ]

    const [infoModal, setInfoModal] = useState(false)

  return (
    <div className={styles.step_2}>
        <h2>Listing Details</h2>

        <div className={styles.list_location}>
        <h3>Where is your listing located? <Info onClick={()=> setInfoModal(!infoModal)}/>
            {infoModal && <InfoModal 
            header={"Privacy Notice"} 
            text={"OpenMat will never disclose your exact address to users."}
            />}
        </h3>
        <input
            type="text"
            className={styles.location_input}
            value={data.location}
            name="location"
            onChange={(e) => change(e)}
            required
        />
        <div className={styles.list_map}>
            <Leaflet/>
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
        {data.images && <ul className={styles.img_previews}>
            {
                [...data.images].map((file, i) => {
                
                return (
                    <li key={i} className={styles.preview_img}>
                    <img src={URL.createObjectURL(file)}/>
                    </li>
                )
                })
            }
        </ul>}
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
                    <div className={styles.date_input} key={i}>
                        <label>
                            Day
                            <select className={styles.day_picker} name="day" onChange={(e) => handleSetDate(e, i)}>
                            <option value="">Choose Day</option>
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
                                <option value="">Choose Time</option>
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
                                <option value="">Choose Time</option>
                                {
                                    times.map((time, i) => {
                                    return (
                                        <option key={i} value={time}>{time}</option>
                                    )
                                    })
                                }
                            </select>
                        </label>
                        <button className={styles.delete_date_btn}><X/></button>
                    </div>
                )
                })
            }
            <button onClick={(e) => handleCreateDate(e)}><PlusCircle/>Add Date</button>
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
