import React from 'react'
import {MapContainer, TileLayer, Circle, Marker } from "react-leaflet"
import "../Styles/map.css"
import "leaflet/dist/leaflet.css"

export default function Leaflet() {
  return (
    <div id="Map"> 
        <MapContainer center={[0,0]} scrollWheelZoom={true} zoom={13}>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
      
    </div>
  )
}
