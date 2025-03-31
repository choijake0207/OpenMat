import React from 'react'
import styles from "../Styles/loader.module.css"

export default function Loader() {
  return (
    <div className={`${styles.client_loader} ${styles[type]}`}>
      <div className={styles.loader_circle}>
        <div className={styles.loader_progress}></div>
      </div>
    </div>
  )
}
