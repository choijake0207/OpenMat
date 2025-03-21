import React, {useState, useEffect} from 'react'
import { useParams, NavLink } from 'react-router-dom'
import PageLayout from '../Wrappers/PageLayout'
import styles from "../Styles/profile.module.css"
import {fetchProfile} from "../API/GET"
import {MapPin, CaretRight, UserCircle, Gear} from "phosphor-react"

export default function Profile() {

  const {id} = useParams()
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const response = await fetchProfile(id)
        console.log(response)
        setProfile(response)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) {
    return <p>...Loading...</p>
  }

  return (
    <PageLayout pageType={"Profile"}>
      <div className={styles.profile_page}>

        <div className={styles.user_column}>

          <header className={styles.profile_banner}>
            <img src={profile.pfp} className={styles.banner_pfp} alt="profile_pic"/>
            <div className={styles.banner_details}>
              <p className={styles.banner_name}> 
                {profile.firstName} {profile.lastName} 
              </p>
              <p className={styles.banner_affiliation}>Affiliation: {profile.affiliation}</p>
              <p className={styles.banner_belt}>Belt: {profile.belt}</p>
              <p className={styles.banner_location}><MapPin/> Los Angeles</p>
            </div>
          </header>

          <div className={styles.account_info}>
            <h2 className={styles.account_info_heading}>Account Info</h2>
            <div className={styles.hosting_widget}>
              <p className={styles.hosting_msg}>Got some available mat space? <br/> <span>Click to be a host</span></p>
              <img src="/jiu-jitsu.png" className={styles.host_logo} alt="jiu_jitsu_owner"/>
            </div>
            <ul className={styles.account_details}>
              <NavLink> 
                <span className={styles.link_labels}> <UserCircle/>Edit Profile</span> 
                <CaretRight/>
              </NavLink>
              <NavLink >
                <span className={styles.link_labels}><Gear/>Account Settings </span>
                <CaretRight/>
              </NavLink>
            </ul>
          </div>

          <button className={styles.logout_btn}>Log Out</button>

        </div>

        {/* add role: host column if auth.role === host */}
      </div>
    </PageLayout>
  )
}
