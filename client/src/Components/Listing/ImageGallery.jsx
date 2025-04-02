import React from 'react'
import styles from "../../Styles/listing.module.css"
import { CaretLeft } from 'phosphor-react'

export default function ImageGallery({images, exitGallery, isOpen, type}) {
  return (
    <div className={`${styles.image_gallery} ${isOpen ? "" : styles.closing}`}>
      <header className={styles.gallery_header}>
        <button className={styles.exit_gallery_button} onClick={(e) => exitGallery(e)}><CaretLeft/></button>
        <p>Images</p>
      </header>
      <ul> 
        {
            type === "preview" ? 
              <ul className={styles.gallery_list}>
                {
                    [...images].map((img, i) => {
                      return (
                          <li key={i} className={styles.gallery_img}>
                            <img src={URL.createObjectURL(img)}/>
                          </li>
                      )
                    })
                }
              </ul>
            : null
        }
      </ul>
      
    </div>
  )
}

