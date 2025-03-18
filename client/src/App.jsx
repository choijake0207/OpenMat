import React from 'react'
import "./App.css"
import {createRoutesFromElements, createBrowserRouter, Navigate, Router, Route, RouterProvider } from "react-router-dom"
import RootLayout from './Wrappers/RootLayout'
import Landing from './Pages/Landing'
import Explore from './Pages/Explore'
import Profile from './Pages/Profile'
import Messages from './Pages/Messages'
import Mats from './Pages/Mats'
import Saved from './Pages/Saved'
import Login from './Components/Login'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Landing/>}/>
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/mats" element={<Mats/>}/>
      <Route path="/login" element={<Login/>}/>

      
      <Route path="/saved" element={<Saved/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/messages" element={<Messages/>}/>
    </Route>
  )
)


export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
