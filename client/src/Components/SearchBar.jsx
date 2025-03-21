import React from 'react'
import {MagnifyingGlass} from "phosphor-react"
import styles from "../Styles/searchBar.module.css"

export default function SearchBar({page}) {
  return (
    <form className={`${styles.search_bar} ${page === "Landing" ? styles.landing : styles.explore}`}>
        <input 
          type="text"
          placeholder='Search Locations or Users'
        />

        <button className={styles.search_btn}><MagnifyingGlass/></button>
    </form>

  )
}
 