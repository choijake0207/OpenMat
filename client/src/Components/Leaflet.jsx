import React from 'react'
import {MapContainer, TileLayer, Circle, Marker } from "react-leaflet"
import "../Styles/map.css"
import "leaflet/dist/leaflet.css"
import DynamicMap from './DynamicMap'

export default function Leaflet({center, zoom}) {
  return (
    <div id="Map"> 
        <MapContainer center={center} scrollWheelZoom={true} zoom={zoom}>
            <DynamicMap center={center} zoom={zoom}/>
            <TileLayer 
                attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=EJT5SIv3LNhwnPyYYMT3TFPFYMkempYTaff2FmoFUVjKh6PE3EMEBEStdb3xedMT'
                accessToken="EJT5SIv3LNhwnPyYYMT3TFPFYMkempYTaff2FmoFUVjKh6PE3EMEBEStdb3xedMT"
            />
          <Marker position={center}/>
        </MapContainer>
      
    </div>
  )
}
