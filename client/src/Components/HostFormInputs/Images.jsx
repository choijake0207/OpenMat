import React from 'react'
import { useHostFormStore } from '../../Utils/HostFormStore'
import styles from "../../Styles/hostSetUp.module.css"

export default function Images() {

    const images = useHostFormStore(store => store.data.images)
    const setImages = useHostFormStore(store => store.setImages)

    const handleImages = (e) => {
        e.preventDefault()
        setImages(e.target.files)
    }

  return (
    <div className ={styles.list_img}>
        <h3>Upload 3 or more pictures:</h3>

        {images && 
            <ul className={styles.img_previews}>
                {
                    [...images].map((file, i) => {
                    
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
            {images === null ? "Upload Images" :" Replace Images"}
            <input
            type="file"
            multiple={true}
            image='image/*'
            name="images"
            className={styles.img_uploader}
            onChange={(e) => handleImages(e)}
            required
            />
        </label>

    </div>

  )
}
