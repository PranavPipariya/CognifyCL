import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";



export default function Landing() {
  const router = useRouter();
  const [installed, setInstalled] = useState(false);

  // useEffect(() => {
  //   const alreadyInstalled = localStorage.getItem("cognify_installed");
  //   if (alreadyInstalled) {
  //     router.push("/dashboard");
  //   }
  // }, []);

  const handleInstallClick = () => {
    // localStorage.setItem("cognify_installed", "true");
    window.open(
      "https://example.com/your-chrome-extension-link",
      "_blank"
    );
    setTimeout(() => {
      router.push("/main");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">

        <p className="text-md text-gray-600 mb-8">
          Chrome web store link coming soon !
          Get the extention from: https://github.com/PranavPipariya/CognifyCL
        </p>

     
    </div>
  );
}
