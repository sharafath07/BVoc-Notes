import React, { useContext } from 'react'
import bg from '../../assets/BackgroundImage.jpg'
import { Context } from '../../Context/Context'
import { ChevronDown } from 'lucide-react'

function Hero() {
  const { isDark } = useContext(Context)

  return (
    <section
      className={`relative flex min-h-screen w-full flex-col items-center justify-center gap-8 sm:gap-10 px-4 sm:px-6 md:px-10 bg-cover bg-center bg-no-repeat font-roboto transition-colors duration-300 ${isDark
        ? 'bg-gray-950 text-white'
        : 'bg-white text-gray-900'
        }`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Background Overlay */}
      <div
        className={`absolute inset-0 ${isDark
          ? 'bg-gradient-to-t from-gray-950 via-black/60 to-black/10'
          : 'bg-gradient-to-t from-white via-white/20 to-transparent'
          }`}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <h1
          className={`font-roboto text-3xl font-bold leading-tight transition-colors duration-300 sm:text-4xl md:text-5xl lg:text-6xl ${isDark
            ? 'text-white'
            : 'text-gray-900'
            }`}
        >
          Department of Software Development
        </h1>

        <p
          className={`mt-3 text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl transition-colors duration-300 ${isDark
            ? 'text-gray-200'
            : 'text-gray-800'
            }`}
        >
          Farook College
        </p>
      </div>

      {/* Explore Button */}
      <button
        type="button"
        onClick={() =>
          document.getElementById('content')?.scrollIntoView({
            behavior: 'smooth'
          })
        }
        className={`relative z-10 flex min-h-[52px] flex-col items-center justify-center rounded-lg border px-5 py-2 text-lg font-caacupe transition-all duration-200 hover:scale-105 active:scale-95 sm:text-xl md:text-2xl ${isDark
          ? 'border-gray-600 bg-gray-900/70 text-white hover:bg-gray-800'
          : 'border-gray-300 bg-white/70 text-gray-900 hover:bg-white'
          }`}
      >
        <span>Explore More</span>
        <ChevronDown
          size={24}
          className="sm:h-7 sm:w-7"
        />
      </button>
    </section>
  )
}

export default Hero