import React from 'react'
import {MagnifyingGlass} from "phosphor-react"
import styles from "../Styles/LandingSearchBar.module.css"

export default function LandingSearchBar() {
  return (
    <form className={styles.landing_search_bar}>
        <input type="text"/>

        <button><MagnifyingGlass/></button>
    </form>

  )
}
