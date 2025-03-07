import React from 'react'
import "./App.css"
import {createRoutesFromElements, createBrowserRouter, Navigate, Router, Route, RouterProvider } from "react-router-dom"
import RootLayout from './Wrappers/RootLayout'
import Landing from './Pages/Landing'
import Explore from './Pages/Explore'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Landing/>}/>
      <Route path="/explore" element={<Explore/>}/>
    </Route>
  )
)


export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
