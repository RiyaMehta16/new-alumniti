import React from 'react'
import Start from './Start'
import Categories from './Categories'
import Question from './Question'
import Footer from './Footer'
import StartNavbar from './StartNavbar'

function Landing() {
  return (
    <div> 
      <StartNavbar/>
      
      <Start/>
      <Categories/>
      <Question/>
      <Footer/>
    </div>
  )
}

export default Landing
