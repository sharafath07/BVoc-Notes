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
            className="flex w-full items-center justify-center"
        >
            <Main />
        </motion.div>
    );
}

export default Login;
