import { CodeXml, Database, GraduationCap, Layers3, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { DepartmentHeading } from "../components/DepartmentPage";
import ScrollReveal from "../components/ScrollReveal";
import CampusPhoto from "../components/CampusPhoto";
import { admissionsUrl, semesterCount } from "../content/softwareDevelopment";

const areas = [
    { icon: CodeXml, title: "Programming", description: "Write, test and debug programs through practical exercises in languages such as Java and Python." },
    { icon: Database, title: "Databases", description: "Work with relational databases and practise how applications store, query and retrieve data." },
    { icon: Network, title: "Computer networks", description: "Study how computers communicate and apply networking concepts in lab work." },
    { icon: Layers3, title: "Software projects", description: "Apply software engineering concepts by planning and building projects." },
];

export default function About() {
    return (
        <main id="main-content">
            <DepartmentHeading title="About the programme" description="Bachelor of Vocation in Software Development at Farook College." />
            <section className="department-section department-container department-article-grid">
                <ScrollReveal>
                    <p className="department-eyebrow"><GraduationCap size={18} aria-hidden="true" /> B.Voc Software Development</p>
                    <h2>Study software through practice</h2>
                    <p>The Bachelor of Vocation in Software Development combines computing fundamentals with practical training. Students build their skills through coursework, lab exercises and projects.</p>
                    <Link to="/resources" className="department-button">Browse academic resources</Link>
                </ScrollReveal>
                <ScrollReveal as="figure" className="department-campus department-article-image" delay={0.06}>
                    <CampusPhoto alt="Main building at Farook College" desktopWidth={50} />
                    <figcaption>Farook College (Autonomous)</figcaption>
                </ScrollReveal>
            </section>
            <ScrollReveal as="section" className="department-container programme-facts" aria-labelledby="programme-facts-title">
                <h2 id="programme-facts-title">Programme at a glance</h2>
                <dl>
                    <div>
                        <dt>Qualification</dt>
                        <dd>Bachelor of Vocation in Software Development</dd>
                    </div>
                    <div>
                        <dt>Duration</dt>
                        <dd>{semesterCount} semesters</dd>
                    </div>
                    <div>
                        <dt>Admissions</dt>
                        <dd><a className="department-text-link" href={admissionsUrl} target="_blank" rel="noopener noreferrer">Check eligibility and how to apply</a></dd>
                    </div>
                </dl>
            </ScrollReveal>
            <section className="department-section department-section-tinted">
                <div className="department-container">
                    <ScrollReveal className="department-section-heading"><h2>What students study</h2></ScrollReveal>
                    <div className="department-study-grid">
                        {areas.map(({ title, description, icon: Icon }, index) => (
                            <ScrollReveal as="article" className="department-study-item" key={title} delay={index * 0.05}>
                                <Icon size={22} aria-hidden="true" />
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </ScrollReveal>
                        ))}
                    </div>
                    <ScrollReveal className="programme-curriculum-links">
                        <Link className="department-text-link" to="/resources">Browse syllabus and course materials</Link>
                    </ScrollReveal>
                </div>
            </section>
            <ScrollReveal as="section" className="department-section department-container department-college-note">
                <h2>About Farook College</h2>
                <p>Farook College was founded to expand educational opportunities in Malabar and became autonomous in 2015. The college offers undergraduate, postgraduate and research programmes and supports community outreach.</p>
                <Link to="/contact" className="department-button department-button-outline">Contact the college</Link>
            </ScrollReveal>
        </main>
    );
}
