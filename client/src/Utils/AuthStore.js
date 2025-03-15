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
    register: async(formData) => {
        try {
            const response = await axios.post(`${API_URL}/user/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            localStorage.setItem("accessToken", response.data.accessToken)
            set((authStore) => ({auth: {
                isAuthorized: true,
                role: response.data.user.role,
                id: response.data.user.id,
                firstName: response.data.user.firstName
            }}))
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
}) 

export const useAuthStore = create(authStore)