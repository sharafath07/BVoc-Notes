import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { DepartmentHeading } from "../components/DepartmentPage";
import ScrollReveal from "../components/ScrollReveal";

const collegeEmail = "mail@farookcollege.ac.in";

export default function Contact() {
    const [openedDraft, setOpenedDraft] = useState(false);

    function openDraft(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const subject = encodeURIComponent("Software Development programme inquiry");
        const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")}\nReply to: ${data.get("email")}`);
        window.location.href = `mailto:${collegeEmail}?subject=${subject}&body=${body}`;
        setOpenedDraft(true);
    }

    return (
        <main id="main-content">
            <DepartmentHeading title="Contact" description="Get in touch with Farook College for programme and department inquiries." />
            <ScrollReveal as="section" className="department-section department-container department-contact-grid">
                <div className="department-contact-details">
                    <h2>College office</h2>
                    <div><MapPin aria-hidden="true" size={22} /><address>Farook College (Autonomous)<br />Farook College P.O.<br />Kozhikode, Kerala 673 632, India</address></div>
                    <div><Phone aria-hidden="true" size={22} /><p><a href="tel:+914952440660">+91 495 2440660</a><br /><a href="tel:+914952440661">+91 495 2440661</a></p></div>
                    <div><Mail aria-hidden="true" size={22} /><a href={`mailto:${collegeEmail}`}>{collegeEmail}</a></div>
                </div>
                <form className="department-card department-form" onSubmit={openDraft}>
                    <h2>Write an inquiry</h2>
                    <p>The form opens a draft in your email app.</p>
                    <label>Name<input name="name" autoComplete="name" required maxLength={100} /></label>
                    <label>Email<input type="email" name="email" autoComplete="email" required maxLength={120} /></label>
                    <label>Message<textarea name="message" rows={5} required maxLength={2000} /></label>
                    <button type="submit" className="department-button">Open email draft</button>
                    {openedDraft && <p role="status">Review and send the draft in your email app.</p>}
                </form>
            </ScrollReveal>
        </main>
    );
}
