import React, {useEffect} from 'react'
import { useMap } from 'react-leaflet'


export default function DynamicMap({center, zoom}) {
    const map = useMap()

    useEffect(() => {
        if (center) {
            map.setView(center, zoom)
        }
    }, [center, zoom, map])

    return null
}
