import React from 'react'
import SearchBar from '../Components/SearchBar'
import Leaflet from '../Components/Leaflet'
import styles from "../Styles/explore.module.css"

export default function Explore() {
  return (
    <div className={styles.explore_page}>

      <section className={styles.search_container}>
        <SearchBar/>
        <div className={styles.results_container}>
          <div className={styles.results_filter_bar}></div>
          <ul className={styles.results_list}></ul>
        </div>
      </section>

      <section className={styles.map_container}>
        <Leaflet/>
      </section>

    </div>
  )
}
