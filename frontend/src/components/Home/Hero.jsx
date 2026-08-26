import React, { useContext } from 'react'
import bg from '../../assets/BackgroundImage.jpg'
import { Context } from '../../Context/Context'
import { ChevronDown } from "lucide-react"

function Hero() {
  const { isDark } = useContext(Context);

  return (
    <div
      className={`relative h-screen bg-cover bg-center flex flex-col w-[100vw] items-center justify-center gap-10 ${isDark ? 'dark' : 'light'}`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-t from-black to-transparent" : "bg-gradient-to-t from-white/30  to-transparent"} to-transparent `} />
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-5xl font-bold font-Roboto z-50'>Department of Software Development</h1>
        <p className='text-3xl font-semibold z-50'>Farook College</p>
      </div>

      <button onClick={() => document.getElementById("content")?.scrollIntoView({
        behavior: "smooth"
      })} className={`flex flex-col justify-center items-center font-caacupe px-3 py-1 text-2xl rounded z-50 ${isDark ? 'dark' : 'light'} hover:scale-105 active:scale-95 transition-transform duration-200`}>Explore More <ChevronDown /></button>
    </div>
  )
}

export default Hero
