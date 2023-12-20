import { Outlet } from "react-router-dom"

const Layout = () => {
  localStorage.setItem("pageParam" , JSON.stringify(1))
  return <>
    <Outlet />
  </>

}

export default Layout