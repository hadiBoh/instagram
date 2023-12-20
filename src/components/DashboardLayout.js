import { Outlet } from "react-router-dom"
import Nav from "../features/nav/Nav"

const DashboardLayout = () => {
  return (
    <>
        <Nav />
        <Outlet/>
    </>
  )
}

export default DashboardLayout