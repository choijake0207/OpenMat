import axios from "axios"
const API_URL = "http://localhost:3005"
// create listing
export const createListing = async (formData) => {
    try {
        const accessToken = localStorage.getItem("accessToken")
        const response = await axios.post(`${API_URL}/listing/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${accessToken}`
            }
        })
        return response.data
    } catch (error) {
        throw error
    }
}