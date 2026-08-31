import React, { useContext } from 'react'
import bg from '../../assets/BackgroundImage.jpg'
import { Context } from '../../Context/Context'
import { ChevronDown } from 'lucide-react'

function Hero() {
  const { isDark } = useContext(Context)

  return (
    <div
      className={`relative flex h-screen w-screen flex-col items-center justify-center gap-10 bg-cover bg-center font-roboto transition-colors duration-300 ${isDark ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'
        }`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div
        className={`absolute inset-0 ${isDark
          ? 'bg-gradient-to-t from-gray-950 via-black/50 to-transparent'
          : 'bg-gradient-to-t from-white/99 via-white/1 to-transparent'
          }`}
      />

      <div className="z-50 flex flex-col items-center justify-center text-center px-6">
        <h1
          className={`text-4xl font-bold font-roboto md:text-5xl transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'
            }`}
        >
          Department of Software Development
        </h1>

        <p
          className={`mt-2 text-2xl font-semibold md:text-3xl transition-colors duration-300 ${isDark ? 'text-gray-200' : 'text-gray-800'
            }`}
        >
          Farook College
        </p>
      </div>

      <button
        type="button"
        onClick={() =>
          document.getElementById('content')?.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className={`z-50 flex flex-col items-center justify-center rounded-lg border px-4 py-2 text-2xl font-caacupe transition-all duration-200 hover:scale-105 active:scale-95 ${isDark
          ? 'border-gray-600 bg-gray-900/70 text-white hover:bg-gray-800'
          : 'border-gray-300 bg-white/70 text-gray-900 hover:bg-white'
          }`}
      >
        Explore More
        <ChevronDown size={28} />
      </button>
    </div>
  )
}

export default Hero