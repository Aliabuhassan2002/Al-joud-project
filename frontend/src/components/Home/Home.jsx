import React from 'react'
import Hero from "./Hero"
import Aya from './Aya'
import OurStory from './OurStory'
import Categories from './Categories'
import Statistics from './Statistics'
import SuccessStory from './SuccessStory'
import Aya2 from './Aya2'
import BenficiarySection from './BenficiarySection'
import CardsDB from './CardsDB'
import ChatBot from '../ChatBot/ChatBot'
function Home() {
  return (
    <>
    <Hero/>
    <Aya/>
    <Categories/>
    <OurStory/>
    <Aya2/> 
    <CardsDB/>
    <SuccessStory/>
    <Statistics/>
    <BenficiarySection/>
    <ChatBot/>
    </>
  )
}

export default Home
