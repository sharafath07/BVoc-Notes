import React, { useContext } from 'react'
import { Context } from '../../Context/Context'
import image from '../../assets/img1.jpg'

function Content() {
    const { isDark } = useContext(Context);

    return (
        <div
            id="content"
            className={`h-screen w-screen flex justify-evenly items-center font-roboto transition-colors duration-300 ${isDark
                ? 'bg-gray-950 text-white'
                : 'bg-white text-gray-900'
                }`}
        >
            <div>
                <img
                    src={image}
                    alt="B.Voc Software Development"
                    className={`h-[50vh] rounded-lg outline-offset-3 outline-5 transition-all duration-300 ${isDark
                        ? 'outline-gray-700'
                        : 'outline-blue-900'
                        }`}
                />
            </div>

            <div className="flex flex-col justify-start items-start w-[50vw] h-[50vh]">
                <h1
                    className={`text-3xl font-caacupe mb-5 transition-colors duration-300 ${isDark
                        ? 'text-white'
                        : 'text-blue-900'
                        }`}
                >
                    B.Voc Software Development
                </h1>

                <p
                    className={`text-justify leading-7 transition-colors duration-300 ${isDark
                        ? 'text-gray-300'
                        : 'text-gray-600'
                        }`}
                >
                    The Bachelor of Vocation (B.Voc) IN SOFTWARE DEVELOPMENT
                    offers an undergraduate programme, which is of 4-year
                    duration. This programme improves the skills of the
                    candidates by concentrating on theoretical knowledge as
                    well as practical training. The main aim of this course is
                    to equip students with skills related to Computer Science
                    and Software Development.
                </p>
            </div>
        </div>
    )
}

export default Content