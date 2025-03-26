import React from 'react'
import styles from "../Styles/infoModal.module.css"

export default function InfoModal({header, text}) {
  return (
    <div className={styles.info_modal}>
        <p className={styles.modal_header}>{header}</p>
        <p className={styles.modal_text}>{text}</p>
    </div>
  )
}
