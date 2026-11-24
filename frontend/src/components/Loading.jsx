import { createPortal } from "react-dom";
import { useContext } from "react";
import { Context } from "../Context/Context";
import TerminalGlyph from "./TerminalGlyph";

export default function Loading() {
    const { isDark } = useContext(Context);
    return createPortal(
        <div
            role="status"
            className="fixed inset-0 z-[9999] grid place-items-center bg-indigo-700/5 backdrop-blur-[8px]"
        >
            <span className="sr-only">Loading</span>
            <span
                aria-hidden="true"
                className={`relative isolate w-[clamp(4.75rem,12vmin,6.25rem)] before:absolute before:-inset-[55%] before:-z-10
                    before:bg-[radial-gradient(ellipse,var(--glow)_6%,transparent_70%)]
                    ${isDark ? "text-[#cec0f5] [--signal:#d7a9ff] [--glow:#231f33]" : "text-indigo-600 [--signal:#9163ce] [--glow:#fffdf9]"}`}
            >
                <svg viewBox="0 0 96 96" className="block w-full"><TerminalGlyph /></svg>
            </span>
        </div>,
        document.body,
    );
}
