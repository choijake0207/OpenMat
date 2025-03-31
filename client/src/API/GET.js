import axios from "axios"

const API_URL = "http://localhost:3005"
const PUBLIC_GEO_KEY="f2bb696f8f9d4c119658400f7d19056a"


// fetch user profile[id]
export const fetchProfile = async(id) => {
    try {
        const response = await axios.get(`${API_URL}/user/profile/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
} 
// geo auto-complete api
export const geoAutoComplete = async (text) => {
    try {
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${PUBLIC_GEO_KEY}`)
        return response.data
    } catch (error) {
        throw error
    }
}
// geo-coder api 
export const geoLocate = async(text) => {
    try {
        const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${text}format=json&apiKey=${PUBLIC_GEO_KEY}`)
        console.log("API Log", response)
        return response.data
    } catch (error) {
        throw error
    }
}