import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { DepartmentHeading } from "../components/DepartmentPage";
import ScrollReveal from "../components/ScrollReveal";
import mubeena from "../assets/faculty/mubeena-v.jpg";
import umarsabik from "../assets/faculty/umarsabik-uk.jpg";
import anas from "../assets/faculty/muhammed-anas-k.jpg";

const directoryUrl = "https://farookcollege.ac.in/Department/department-of-bvoc-it-sf/faculty";
const profileBase = "https://farookcollege.ac.in/department/department-of-bvoc-it-sf/faculty/";
const officePhone = "+91 495 244 0660";

const faculty = [
    {
        name: "Mubeena V.",
        role: "Assistant Professor and Head of Department",
        portrait: mubeena,
        email: "hodsd@farookcollege.ac.in",
        phone: "+91 96051 86575",
        education: ["MCA", "M.Phil. in Computer Science"],
        highlights: ["Represents Software Development on the college Academic Council."],
        profile: "60c6ee6990bb1",
    },
    {
        name: "Umarsabik U.K.",
        role: "Assistant Professor (Contract)",
        portrait: umarsabik,
        email: "developer.ukofficial@gmail.com",
        phone: "+91 98464 33991",
        education: ["M.Voc. in Mobile Phone Application Development, CUSAT", "B.Voc. in Information Technology, Farook College"],
        interests: "Android and iOS development, Internet of Things",
        highlights: ["Worked as a software developer and led workshops on web development, Android and Python."],
        profile: "ef4242bb-afcf-49ab-ac0a-87e2c4a926e4",
    },
    {
        name: "Muhammed Anas K.",
        role: "Assistant Professor (Contract)",
        portrait: anas,
        email: "anaskavanoor6@gmail.com",
        phone: officePhone,
        phoneLabel: "College office",
        education: ["M.Sc. in Statistics"],
        interests: "Operations research, lifetime data analysis and big data",
        highlights: ["Qualified UGC-NET.", "Research interests include income modelling and inequality measures."],
        profile: "206dfac6-f91d-42b7-b131-79623ea0a518",
    },
    { name: "Fathima" },
    { name: "Muhsin" },
    { name: "Nidha" },
    { name: "Adeeba" },
];

function FacultyCard({ member, lead = false, delay = 0 }) {
    const hasContact = Boolean(member.email || member.phone);
    const hasDetails = Boolean(member.education?.length || member.interests || member.highlights?.length || member.profile);

    return (
        <ScrollReveal as="article" delay={delay} className={`faculty-card ${lead ? "faculty-card-lead" : ""}`}>
            <header className={`faculty-card-header ${hasContact ? "" : "faculty-card-header-simple"}`}>
                {member.portrait ? (
                    <img
                        src={member.portrait}
                        alt={member.name}
                        width="450"
                        height="600"
                        loading={lead ? "eager" : "lazy"}
                        decoding="async"
                        className="faculty-portrait"
                    />
                ) : (
                    <span className="faculty-portrait faculty-portrait-initial" aria-hidden="true">{member.name.charAt(0)}</span>
                )}
                <div className="faculty-card-identity">
                    <h2>{member.name}</h2>
                    {member.role && <p>{member.role}</p>}
                    {!hasDetails && !hasContact && <p>Profile details pending</p>}
                </div>
                {hasContact && (
                    <div className="faculty-contact">
                        {member.email && <a href={`mailto:${member.email}`}><Mail size={16} aria-hidden="true" /> <span>{member.email}</span></a>}
                        {member.phone && <a href={`tel:${member.phone.replace(/\s/g, "")}`}><Phone size={16} aria-hidden="true" /> <span>{member.phone}{member.phoneLabel && ` · ${member.phoneLabel}`}</span></a>}
                    </div>
                )}
            </header>
            {hasDetails && (
                <div className="faculty-card-details">
                    {Boolean(member.education?.length) && (
                        <div>
                            <h3>Education</h3>
                            <ul>{member.education.map((degree) => <li key={degree}>{degree}</li>)}</ul>
                        </div>
                    )}
                    {member.interests && <div><h3>Areas of expertise</h3><p>{member.interests}</p></div>}
                    {Boolean(member.highlights?.length) && (
                        <div>
                            <h3>Career highlights</h3>
                            <ul>{member.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                        </div>
                    )}
                    {member.profile && <a className="department-text-link" href={profileBase + member.profile} target="_blank" rel="noopener noreferrer" aria-label={`College profile for ${member.name}`}>College profile</a>}
                </div>
            )}
        </ScrollReveal>
    );
}

export default function Faculty() {
    const [head, ...teachers] = faculty;

    return (
        <main id="main-content">
            <DepartmentHeading title="Faculty" description="Qualifications, areas of expertise and contact details for our teaching staff." />
            <div className="department-container department-section faculty-directory">
                <FacultyCard member={head} lead />
                <div className="faculty-directory-grid">
                    {teachers.map((member, index) => <FacultyCard key={member.name} member={member} delay={(index % 2) * 0.06} />)}
                </div>
                <ScrollReveal className="department-contact-note faculty-directory-note">
                    <p>Published profile details and portraits are from the <a href={directoryUrl} target="_blank" rel="noopener noreferrer">Farook College directory</a>.</p>
                    <Link className="department-text-link" to="/contact">Contact the college office</Link>
                </ScrollReveal>
            </div>
        </main>
    );
}
