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
    authCheck: async() => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const response = await axios.get(`${API_URL}/user/authorize`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            set((authStore) => ({auth: {
                isAuthorized: true,
                role: response.data.role,
                id: response.data.id,
                firstName: response.data.firstName
            }}))
            console.log(auth)
        } catch (error) {
            console.error
        }
    },
    logout: () => {
        localStorage.removeItem("accessToken")
        set((authStore) => ({auth: {
            isAuthorized: false,
            role: "",
            id: "",
            firstName: ""
        }}))
    },
    login: async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/user/login`, formData)
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
    }
}) 

export const useAuthStore = create(authStore)