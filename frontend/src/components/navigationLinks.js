export const publicLinks = [
    ["Home", "/"], ["About", "/about"], ["Faculty", "/faculty"],
    ["Resources", "/resources"], ["Community", "/chat"], ["Contact", "/contact"],
];

export const staffLinks = [
    ["Overview", "/admin/dashboard"], ["Students", "/admin/dashboard/students"],
    ["Faculty", "/admin/dashboard/faculties"], ["Subjects", "/admin/dashboard/subjects"],
    ["Resources", "/admin/dashboard/resources"], ["Community", "/chat"],
];

export function navigationDirection(from, to) {
    const links = [from, to].some(path => path.startsWith("/admin/dashboard")) ? staffLinks : publicLinks;
    // A nested staff form belongs to the same menu item as its list.
    const section = path => links.findLastIndex(([, href]) => path === href || path.startsWith(href + "/"));
    const previous = section(from);
    const next = section(to);
    return previous < 0 || next < 0 ? 0 : Math.sign(next - previous);
}
