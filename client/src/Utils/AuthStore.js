import {create} from "zustand"
import axios from "axios"

const API_URL = "http://localhost:3005"

const authStore = (set) => ({
    auth: {
        isAuthorized: false,
        role: "",
        id: "",
        firstName: ""
    },
    register: async(userData) => {
        try {
            const response = await axios.post(`${API_URL}/user/register`, {userData: userData})
            localStorage.setItem("accessToken", response.accessToken)
            set((authStore) => ({auth: {
                isAuthorized: true,
                role: response.user.role,
                id: response.user.id,
                firstName: response.user.firstName
            }}))
            return response.data
        } catch (error) {
            console.error(response.error)
        }
    },
}) 

export const useAuthStore = create(authStore)