import React, { useContext } from 'react';
import { Context } from '../../Context/Context';
import image from '../../assets/img1.jpg';

function Content() {
    const { isDark } = useContext(Context);

    return (
        <section
            id="content"
            className={`
                min-h-screen w-full
                flex flex-col md:flex-row
                justify-center md:justify-evenly
                items-center
                gap-10 md:gap-8 lg:gap-16
                px-5 sm:px-8 md:px-10 lg:px-16
                py-12 md:py-10
                font-roboto
                transition-colors duration-300
                ${isDark
                    ? 'bg-gray-950 text-white'
                    : 'bg-white text-gray-900'
                }
            `}
        >

            {/* =========================
                IMAGE
            ========================= */}

            <div
                className="
                    w-full
                    md:w-[42%]
                    lg:w-auto
                    flex
                    justify-center
                    items-center
                    shrink-0
                "
            >
                <img
                    src={image}
                    alt="B.Voc Software Development"
                    className={`
                        w-full
                        max-w-[340px]
                        sm:max-w-[400px]
                        md:max-w-[360px]
                        lg:max-w-[420px]
                        h-auto
                        md:h-[40vh]
                        lg:h-[50vh]
                        object-cover
                        rounded-lg
                        outline
                        outline-4
                        outline-offset-4
                        transition-all duration-300
                        ${isDark
                            ? 'outline-gray-700'
                            : 'outline-blue-900'
                        }
                    `}
                />
            </div>


            {/* =========================
                CONTENT
            ========================= */}

            <div
                className="
                    flex
                    flex-col
                    justify-center
                    items-start
                    w-full
                    md:w-[50%]
                    lg:w-[48vw]
                    max-w-2xl
                    h-auto
                    md:min-h-[40vh]
                    lg:min-h-[50vh]
                "
            >
                <h1
                    className={`
                        text-2xl
                        sm:text-3xl
                        lg:text-4xl
                        font-caacupe
                        mb-4
                        sm:mb-5
                        leading-tight
                        transition-colors duration-300
                        ${isDark
                            ? 'text-white'
                            : 'text-blue-900'
                        }
                    `}
                >
                    B.Voc Software Development
                </h1>

                <p
                    className={`
                        text-sm
                        sm:text-base
                        leading-6
                        sm:leading-7
                        text-left
                        md:text-justify
                        transition-colors duration-300
                        ${isDark
                            ? 'text-gray-300'
                            : 'text-gray-600'
                        }
                    `}
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

        </section>
    );
}

export default Content;