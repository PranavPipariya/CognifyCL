import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Landing() {
  const router = useRouter();
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const alreadyInstalled = localStorage.getItem("cognify_installed");
    if (alreadyInstalled) {
      router.push("/dashboard");
    }
  }, []);

  const handleInstallClick = () => {
    localStorage.setItem("cognify_installed", "true");
    window.open("https://example.com/your-chrome-extension-link", "");
    setTimeout(() => {
      router.push("/main");
    }, 1000);
  };

  const logo = (
    <>
      {"Cognify"}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="font-semibold text-sky-600 ml-1"
      >
        CL
      </motion.span>
    </>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-sky-50 via-sky-100 to-sky-200 overflow-hidden">
      {/* Soft animated cloud blobs */}
      <motion.div
        className="absolute w-[800px] h-[800px] bg-white opacity-20 rounded-full blur-3xl top-[-200px] left-[-250px]"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 10, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-2xl bottom-[-100px] right-[-150px]"
        animate={{
          x: [0, -20, 20, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Centered Content */}
      <motion.div
        className="z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl sm:text-6xl font-light tracking-wide text-neutral-800 uppercase mb-5">
          {logo}
        </h1>

        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          Automatically Curate What You Consume
        </p>

        <p className="text-2xl sm:text-3xl font-light text-gray-700 mb-12 leading-snug max-w-2xl mx-auto">
          Seamlessly build your public knowledge graph.<br />
          Without comprimising on privacy!
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 180 }}
        >
          <Button
            className="px-8 py-5 text-lg sm:text-xl font-semibold bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-md rounded-2xl"
            onClick={handleInstallClick}
          >
            🌤️ Get the Chrome Extension
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
