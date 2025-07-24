import React from 'react'
import "./Leftsidebar.css"
import shorts from "./shorts.png"
import { AiOutlineHome } from "react-icons/ai"
import { MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary, MdGroupAdd, MdGroups } from "react-icons/md"
import { NavLink } from 'react-router-dom'

const Leftsidebar = () => {
  return (
    <div className="container_leftSidebar">
      <NavLink to={'/'} className="icon_sidebar_div">
        <AiOutlineHome size={22} className='icon_sidebar' />
        <div className="text_sidebar_icon">Home</div>
      </NavLink>

      <div className="icon_sidebar_div">
        <MdOutlineExplore size={22} className='icon_sidebar' />
        <div className="text_sidebar_icon">Explore</div>
      </div>

      <div className="icon_sidebar_div">
        <img src={shorts} alt="shorts icon" width={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Shorts</div>
      </div>

      <div className="icon_sidebar_div">
        <MdOutlineSubscriptions size={22} className='icon_sidebar' />
        <div className="text_sidebar_icon" style={{ fontSize: "12px" }}>Subscription</div>
      </div>

      <NavLink to={'/Library'} className="icon_sidebar_div">
        <MdOutlineVideoLibrary size={22} className='icon_sidebar' />
        <div className="text_sidebar_icon">Library</div>
      </NavLink>

      {/* ✅ GROUP LINKS ADDED BELOW */}
      <NavLink to={'/create-group'} className="icon_sidebar_div">
        <MdGroupAdd size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Create Group</div>
      </NavLink>

      <NavLink to={'/search-group'} className="icon_sidebar_div">
        <MdGroups size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Search Groups</div>
      </NavLink>
      <NavLink to={'/group-list'} className="icon_sidebar_div">
  <MdGroups size={22} className="icon_sidebar" />
  <div className="text_sidebar_icon">Group List</div>
</NavLink>

    </div>
    
  )
}

export default Leftsidebar
