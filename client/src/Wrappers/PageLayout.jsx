import React from 'react'
import styles from "../Styles/root.module.css"


// style wrapper for profile, saved, and message pages

export default function PageLayout({children, pageType}) {
  return (
    <div className={styles.page_layout}>
        <header>{pageType}</header>
        <main className={styles.page_content}>

            {children}

        </main>
    </div>
  )
}
