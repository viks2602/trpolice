import {  Route, Routes } from "react-router-dom"
import RootLayout from "../../pages/rootlayout/RootLayout"
import SignIn from "../../pages/auth/SignIn"
import Leads from "../../pages/leads/Leads"

const AllRoutes = () => {
  return (
   <Routes>
    <Route index element={<SignIn/>}/>
    <Route path="user" element={<RootLayout/>}>
     <Route index element={<Leads/>}/>
    </Route>
   </Routes> 
  )
}

export default AllRoutes