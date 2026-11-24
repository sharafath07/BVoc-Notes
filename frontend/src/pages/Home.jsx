import { BookOpen, MessagesSquare, Users } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/Context";
import ScrollReveal from "../components/ScrollReveal";
import CampusPhoto from "../components/CampusPhoto";
import { admissionsUrl, semesterCount } from "../content/softwareDevelopment";

const destinations = [
    { title: "Academic resources", description: "Notes, syllabi, lab material and past papers.", url: "/resources", icon: BookOpen },
    { title: "Faculty directory", description: "Teaching staff, qualifications and contact details.", url: "/faculty", icon: Users },
    { title: "Community chat", description: "Conversations for students, teachers and alumni.", url: "/chat", icon: MessagesSquare },
];

export default function Home() {
    const { token, user } = useContext(Context);

    return (
        <main id="main-content">
            <section className="department-hero">
                <div className="department-container department-hero-grid">
                    <div className="department-hero-copy">
                        <p className="department-eyebrow">Farook College (Autonomous)</p>
                        <h1><span>Department of</span>{" "}Software Development</h1>
                        <p>The Bachelor of Vocation programme in Software Development brings computing fundamentals and practical coursework together at Farook College, Kozhikode.</p>
                        <div className="department-actions">
                            <Link className="department-button" to="/about">Explore the programme</Link>
                            <Link className="department-text-link" to="/resources">Browse resources</Link>
                        </div>
                    </div>
                    <figure className="department-campus">
                        <CampusPhoto alt="Farook College campus and landscaped gardens" desktopWidth={54} priority />
                        <figcaption>Farook College campus <span>Kozhikode, Kerala</span></figcaption>
                    </figure>
                </div>
            </section>

            <section aria-labelledby="department-directory" className="department-section department-container department-directory">
                <ScrollReveal className="department-section-heading">
                    <h2 id="department-directory">Department directory</h2>
                    <p>Find teaching staff, course materials and student services.</p>
                </ScrollReveal>
                <ul className="department-directory-links">
                    {destinations.filter(({ url }) => url !== "/chat" || (token && user)).map(({ title, description, url, icon: Icon }, index) => (
                        <ScrollReveal as="li" key={url} delay={index * 0.04}>
                            <Link to={url}>
                                <Icon aria-hidden="true" size={20} />
                                <span><strong>{title}</strong><small>{description}</small></span>
                            </Link>
                        </ScrollReveal>
                    ))}
                </ul>
            </section>

            <section className="department-programme">
                <ScrollReveal className="department-container department-programme-grid">
                    <div>
                        <h2>B.Voc in Software Development</h2>
                        <p>An {semesterCount}-semester undergraduate programme with programming, lab work and software projects.</p>
                    </div>
                    <div className="department-programme-details">
                        <Link className="department-button" to="/about">Programme details</Link>
                        <a className="department-text-link" href={admissionsUrl} target="_blank" rel="noopener noreferrer">College admissions</a>
                    </div>
                </ScrollReveal>
            </section>
        </main>
    );
}
