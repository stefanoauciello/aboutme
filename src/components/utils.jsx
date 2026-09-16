const containerVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 12 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { 
        opacity: 0, 
        scale: 0.98, 
        y: -10, 
        transition: { duration: 0.2, ease: "easeIn" } 
    },
};

export default containerVariants;