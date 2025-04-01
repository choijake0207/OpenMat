import React from 'react'
import styles from "../../Styles/hostSetUp.module.css"
import { HouseLine, BuildingOffice } from "@phosphor-icons/react"
import { useHostFormStore } from '../../Utils/HostFormStore'

export default function Type() {

    const setType = useHostFormStore(store => store.setType)
    const type = useHostFormStore(store => store.data.type)

    const handleType = (e, type) => {
        e.preventDefault()
        setType(type)
    }

  return (
    <div className={styles.list_type}>
        <h3>Which describes your listing facility?</h3>

        <div className={styles.list_type_btns}>

            <button 
                className={`${styles.type_btn} ${type === "Residential" ? styles.active_type: ""}`}
                onClick={(e) => handleType(e, "Residential")}
            >
                <HouseLine/> Residential
            </button>

            <button 
                className={`${styles.type_btn} ${type === "Commercial" ? styles.active_type: ""}`}
                onClick={(e) => handleType(e, "Commercial")}
            >
                <BuildingOffice/> Commercial 
            </button>

        </div>

    </div>

  )
}
