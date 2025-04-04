import React, {useState, useEffect} from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import PageLayout from '../Wrappers/PageLayout'
import styles from "../Styles/profile.module.css"
import {fetchProfile} from "../API/GET"
import {MapPin, CaretRight, UserCircle, Gear} from "phosphor-react"
import Loader from "../Components/Loader"
import Avatar from '../Components/Avatar'

export default function Profile() {

  const {id} = useParams()
  const [profile, setProfile] = useState()
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
    return <Loader type={"page"}/>
  }

  return (
    <PageLayout pageType={"Profile"}>
      <div className={styles.profile_page}>

        <div className={styles.user_column}>

          <header className={styles.profile_banner}>
            <div className={styles.banner_headshot}>
              {profile.pfp ? <img src={profile.pfp} className={styles.banner_pfp} alt="profile_pic"/> : <Avatar name={profile.firstName} type={"page"}/>}
              <p className={styles.banner_name}> 
                {profile.firstName} {profile.lastName} 
              </p>
              <p>{profile.role === "host" ? "Host" : "Guest"}</p>
            </div>
            <div className={styles.banner_details}>
              
              <p className={styles.banner_affiliation}>Affiliation: {profile.affiliation}</p>
              <p className={styles.banner_belt}>Belt: {profile.belt}</p>
              <p className={styles.banner_location}><MapPin/> Los Angeles</p>
            </div>
          </header>

          <div className={styles.account_info}>
            <h2 className={styles.account_info_heading}>Account Info</h2>
            <div className={styles.hosting_widget} onClick={() => navigate("/host/setup")}>
              <p className={styles.hosting_msg}>Got some available mat space? <br/> <span>Click to host</span></p>
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

      </div>
    </PageLayout>
  )
}
