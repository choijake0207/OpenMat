import axios from "axios"

const API_URL = "http://localhost:3005"

export const fetchProfile = async(id) => {
    try {
        const response = await axios.get(`${API_URL}/user/profile/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
} 