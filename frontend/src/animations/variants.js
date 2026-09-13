// Page entrance animation
export const pageVariants = {
    hidden: {
        opacity: 0,
        y: 15,
    },

    visible: {
        opacity: 1,
        y: 0,
    },
};

// Card entrance animation
export const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
    },

    visible: {
        opacity: 1,
        y: 0,
    },
};

// Parent container for staggered children
export const containerVariants = {
    hidden: {},

    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

// Small button interaction
export const buttonVariants = {
    hover: {
        scale: 1.02,
    },

    tap: {
        scale: 0.97,
    },
};

// Modal animation
export const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: 10,
    },

    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
    },

    exit: {
        opacity: 0,
        scale: 0.95,
        y: 10,
    },
};

// Simple fade animation
export const fadeVariants = {
    hidden: {
        opacity: 0,
    },

    visible: {
        opacity: 1,
    },

    exit: {
        opacity: 0,
    },
};

// Slide from the right
export const slideRightVariants = {
    hidden: {
        opacity: 0,
        x: 20,
    },

    visible: {
        opacity: 1,
        x: 0,
    },

    exit: {
        opacity: 0,
        x: 20,
    },
};

// Slide from the left
export const slideLeftVariants = {
    hidden: {
        opacity: 0,
        x: -20,
    },

    visible: {
        opacity: 1,
        x: 0,
    },

    exit: {
        opacity: 0,
        x: -20,
    },
};

// List item animation
export const listItemVariants = {
    hidden: {
        opacity: 0,
        y: 10,
    },

    visible: {
        opacity: 1,
        y: 0,
    },

    exit: {
        opacity: 0,
        y: -10,
    },
};