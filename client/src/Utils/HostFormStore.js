import { create } from "zustand";

const hostFormStore = (set) => ({
    data: {
        coordinates: null,
        address: null,
        type: null,
        images: null,
        description: "",
        scheduleType: "",
        scheduleList: []
    },

    // set coords
    setCoords: (coords) => {
        set((hostFormStore) => ({data: {
            ...hostFormStore.data,
            coordinates: coords
        }}))
    },
    // set address with validated query result
    setAddress: (address) => {
        set((hostFormStore) => ({data: {
            ...hostFormStore.data,
            address: address
        }}))
    },
    // set listing type
    setType: (type) => {
        set((hostFormStore) => ({data: {
            ...hostFormStore.data,
            type: type
        }}))
    },
    // set images
    setImages: (files) => {
        set((hostFormStore) => ({data: {
        ...hostFormStore.data,
        images: files
        }}))
    },
    // set desc.
    setDescription: (desc) => {
        set((hostFormStore) => ({data: {
        ...hostFormStore.data,
        description: desc
        }}))
    },
    // set scheduleTypes
    setScheduleType: (value) => {
        set((hostFormStore) => ({data: {
        ...hostFormStore.data,
        scheduleType: value
        }}))
    },
    // create date
    createDate: () => {
        set((hostFormStore) => ({data: {
            ...hostFormStore.data,
            scheduleList: [...hostFormStore.data.scheduleList, {day: "", start: "", end: "", id: Date.now()}]
        }}))
    },
    // update date
    updateDate: (field, value, id) => {
        set((hostFormStore) => ({data: {
            ...hostFormStore.data,
            scheduleList: hostFormStore.data.scheduleList.map((date) => 
                date.id === id ? {...date, [field]: value} : date
            )
        }}))
    },
    // remove date
    removeDate: (id) => {
        set((hostFormStore) => ({data: {
            ...hostFormStore.data,
            scheduleList: hostFormStore.data.scheduleList.filter((date) => id !== date.id)
        }}))
    }




})

export const useHostFormStore = create(hostFormStore)