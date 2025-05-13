import React from "react";
import { motion } from "framer-motion";
import containerVariants from "../components/utils";

function Home() {
    const photo = `${import.meta.env.BASE_URL}profile.jpg`;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
        >
            <div className="sm:hidden w-full min-h-[100dvh] flex flex-col">
                <img
                    src={photo}
                    alt="Stefano Auciello"
                    className="w-full h-2/3 object-cover"
                />
                <div className="flex-1 flex flex-col justify-center items-center bg-blue-50">
                    <h1 className="text-4xl font-extrabold text-blue-600">
                        Stefano Auciello
                    </h1>
                    <p className="text-lg text-blue-600">Senior Software Engineer</p>
                </div>
            </div>
            <div className="hidden sm:block">
                <div
                    className="mx-auto sm:max-w-2xl lg:max-w-4xl bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-xl rounded-2xl px-8 py-10 lg:p-12 text-blue-900 text-center space-y-6">
                    <img
                        src={photo}
                        alt="Stefano Auciello"
                        className="w-40 lg:w-60 h-auto border-4 border-blue-300 shadow-lg rounded-lg mx-auto"
                    />
                    <div className="space-y-2">
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-600">
                            Stefano Auciello
                        </h1>
                        <p className="text-xl text-blue-600">Senior Software Engineer</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Home;