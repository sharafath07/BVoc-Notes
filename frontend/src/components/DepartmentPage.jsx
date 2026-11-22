import { Link } from "react-router-dom";

export function DepartmentHeading({ title, description }) {
    return (
        <header className="department-heading">
            <div className="department-container">
                <Link className="department-eyebrow" to="/">Department of Software Development</Link>
                <h1>{title}</h1>
                {description && <p>{description}</p>}
            </div>
        </header>
    );
}
