import React, {useState} from 'react'
import InfoModal from '../InfoModal'
import { Info } from 'phosphor-react'
import Leaflet from '../Leaflet'
import styles from "../../Styles/hostSetUp.module.css"
import { geoLocate } from '../../API/GET'
import Loader from '../Loader'
import { useHostFormStore } from '../../Utils/HostFormStore'

export default function Location() {

    const [infoModal, setInfoModal] = useState(false)
    const [locationInput, setLocationInput ] = useState("")
    const [loadingGeoCode, setLoadingGeoCode] = useState(false)
    const [geoCodeError, setGeoCodeError] = useState({status: false, message: null})
    const [resultsFound, setResultsFound] = useState(false)
    const coordinates = useHostFormStore(store => store.data.coordinates)
    const setCoords = useHostFormStore(store => store.setCoords)
    const setAddress = useHostFormStore(store => store.setAddress)
    const address = useHostFormStore(store => store.data.address)

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
                setAddress({
                    street: response.features[0].properties.address_line1,
                    city: response.features[0].properties.city,
                    state: response.features[0].properties.state,
                    zip: response.features[0].properties.postcode,
                    country: response.features[0].properties.country
                })
                setCoords({lat: response.features[0].properties.lat, lon: response.features[0].properties.lon})
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingGeoCode(false)
            setResultsFound(true)
        }
    }


  return (
    <div className={styles.list_location}>

        <h3>Where is your listing located? <Info onMouseEnter={()=> setInfoModal(true)} onMouseLeave={() => setInfoModal(false)}/>
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
            <button 
                className={styles.save_button} 
                onClick={(e) => fetchCoords(e)} 
                disabled={loadingGeoCode}
            >
                {loadingGeoCode ? <Loader type="button"/> : "Search"}
            </button>
        </div>

        {geoCodeError.status && 
            <p className={styles.location_search_error}>{geoCodeError.message}</p>
        }

        {resultsFound &&
            <div className={styles.location_results}>
                <label>
                    Street: <p>{address.street}</p>
                </label>
                <div className={styles.results_details}>
                    <label>
                        City: <p>{address.city}</p>
                    </label>
                    <label>
                        State: <p>{address.state}</p>
                    </label>
                    <label>
                        Zip Code: <p>{address.zip}</p>
                    </label>
                </div>
                <label>
                    Country: <p>{address.country}</p>
                </label>
            </div>
        }

        <div className={styles.list_map}>
            <Leaflet
                center={coordinates ?? [0,0]}
                zoom={15}
            />
        </div>

    </div>
  )
}
