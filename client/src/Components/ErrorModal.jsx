import React from 'react'
import styles from "../Styles/errorModal.module.css"
import { Question, X } from 'phosphor-react'

export default function ErrorModal({type, message, handleConfirm}) {
  return (
    <div className={styles.error_modal_overlay}>
        <div className={styles.error_modal}>
            <p className={styles.error_symbol}><Question weight={"fill"}/></p>
            <h1 className={styles.error_type}>{type}</h1>
            <p className={styles.error_message}>{message}</p>
            <button className={styles.confirm_error_button} onClick={(e) => handleConfirm(e)}>Continue</button>
        </div>
    </div>
  )
}
