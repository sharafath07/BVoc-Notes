import React from "react";
import { motion } from "motion/react";
import Main from "../components/Login/Main.jsx";

function Login() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.45,
                ease: "easeOut",
            }}
            className="flex min-h-screen w-full items-center justify-center bg-[#f3f4f6]"
        >
            <Main />
        </motion.div>
    );
}

export default Login;