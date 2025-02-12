// rafce

import { NavLink, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
        <NavLink to='/' className='btn btn-info me-2'>Tasks</NavLink>  
        <NavLink to='/users' className='btn btn-info me-2'>Users</NavLink> 
        <NavLink to='/comments' className='btn btn-info me-2'>Comments</NavLink> 
        <NavLink to='/posts' className='btn btn-info'>Posts</NavLink> 
        
    <main>
        <Outlet />
    </main>

    </div>
  )
}

export default Layout