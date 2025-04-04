import React from 'react'
import styles from "../Styles/avatar.module.css"
export default function Avatar({name, type}) {
  return (
    <div className={`${styles.avatar} ${styles[type]}`}>
      <p className={styles.avatar_letter}>{name.slice(0,1).toUpperCase()}</p>
    </div>
  )
}
