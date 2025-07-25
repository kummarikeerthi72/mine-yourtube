import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Search from './Pages/Search/Search'
import Videopage from './Pages/Videopage/Videopage'
import Channel from './Pages/Channel/Channel'
import Library from './Pages/Library/Library'
import Likedvideo from './Pages/Likedvideo/Likedvideo'
import Watchhistory from './Pages/Watchhistory/Watchhistory'
import Watchlater from './Pages/Watchlater/Watchlater'
import Yourvideo from './Pages/Yourvideo/Yourvideo'
import CreateGroup from "./Pages/Groups/CreateGroup";
import SearchGroup from "./Pages/Groups/SearchGroup";
import GroupList from "./Pages/GroupList/GroupList";
const Allroutes = ({seteditcreatechanelbtn,setvideouploadpage}) => {
  return (
    <Routes>
        <Route path='/'element={<Home/>}/>
        <Route path='/search/:Searchquery' element={<Search/>}/>
        <Route path='/videopage/:vid' element={<Videopage/>}/>
        <Route path='/Library' element={<Library/>}/>
        <Route path='/Likedvideo' element={<Likedvideo/>}/>
        <Route path='/Watchhistory' element={<Watchhistory/>}/>
        <Route path='/Watchlater' element={<Watchlater/>}/>
        <Route path='/Yourvideo' element={<Yourvideo/>}/>
        <Route path='/channel/:cid' element={<Channel seteditcreatechanelbtn={seteditcreatechanelbtn} setvideouploadpage={setvideouploadpage}/>}/>
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/search-group" element={<SearchGroup />} /> 
        <Route path="/groups" element={<GroupList />} />

       
      
    </Routes>
  )
}

export default Allroutes