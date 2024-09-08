  import React from 'react'
import { Link, Outlet } from 'react-router-dom'
  

const Postlayout = () => {
  return (
    <div>
    <Link to ="/postpage/1">post1</Link><br />
    <Link to ="/postpage/2">post2</Link><br />
    <Link to ="/postpage/3">post3</Link><br />
    <Link to ="/postpage/newpost">newpost</Link><br />
    <Outlet/>
    </div>
  )
}

export default Postlayout