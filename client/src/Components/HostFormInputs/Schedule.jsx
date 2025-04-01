import React from 'react'
import { useHostFormStore } from '../../Utils/HostFormStore'
import styles from "../../Styles/hostSetUp.module.css"
import { PlusCircle, X } from 'phosphor-react'

export default function Schedule() {

    const scheduleList = useHostFormStore(store => store.data.scheduleList)
    const scheduleType = useHostFormStore(store => store.data.scheduleType)
    const setScheduleType = useHostFormStore(store => store.setScheduleType)
    const createDate = useHostFormStore(store => store.createDate)
    const updateDate = useHostFormStore(store => store.updateDate)
    const removeDate = useHostFormStore(store => store.removeDate)
    const times = [
        "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", 
        "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm",
        "9:00pm", "10:00pm", "All Day"
    ]

    const handleCreateDate = (e) => {
        e.preventDefault()
        createDate()
    }
    const handleRemoveDate = (e, id) => {
        e.preventDefault()
        removeDate(id)
    }


  return (
    <div className={styles.list_scheduling}>
            <h3>What is your availability?</h3>

            <select value={scheduleType} name="scheduleType" className={styles.scheduling_type_picker} onChange={(e) => setScheduleType(e.target.value)} required>
                <option value="">Select Schedule</option>
                <option value="Fixed">Fixed</option>
                <option value="Flexible">Flexible</option>
            </select>

            {
                scheduleType === "Fixed" &&
                    <div className={styles.schedule_list}>
                        {
                            scheduleList.length > 0 && scheduleList.map((date, i) => {
                                return (
                                    <div className={styles.date_input} key={date.id}>

                                        <label>
                                            Day
                                            <select className={styles.day_picker} name="day" onChange={(e) => updateDate("day", e.target.value, date.id)}>
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
                                            <select className={styles.start_picker} name="start" onChange={(e) => updateDate("start", e.target.value, date.id)}>
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
                                            <select className={styles.end_picker} name="end" onChange={(e) => updateDate("end", e.target.value, date.id)}>
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

                                        <button 
                                            className={styles.delete_date_btn} 
                                            onClick={(e) => handleRemoveDate(e, date.id)}
                                        >
                                            <X/>
                                        </button>

                                    </div>
                                )
                            })
                        }
                    <button className={styles.add_date_btn} onClick={(e) => handleCreateDate(e)}><PlusCircle/>Add Date</button>

                </div>
            }

        </div>
  )
}
