import React from 'react'
import {MagnifyingGlass} from "phosphor-react"
import styles from "../Styles/searchBar.module.css"

export default function SearchBar() {
  return (
    <form className={styles.landing_search_bar}>
        <input type="text"/>

        <button><MagnifyingGlass/></button>
    </form>

  )
}
