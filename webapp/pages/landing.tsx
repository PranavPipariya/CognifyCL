import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";



export default function Landing() {
  const router = useRouter();
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const alreadyInstalled = localStorage.getItem("cognify_installed");
    if (alreadyInstalled) {
      router.push("/main");
    }
  }, []);

  const handleInstallClick = () => {
    localStorage.setItem("cognify_installed", "true");
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
      <div className="absolute top-6 left-6 text-xl font-semibold tracking-tight text-gray-800">
        Cognify CL
      </div>

      <div className="text-center max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">
          Automatically Curate What You Consume
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4">
          Forget Less. <br />
          <span className="text-blue-600">Learn More.</span>
        </h1>
        <p className="text-md text-gray-600 mb-8">
          Seamlessly build your public knowledge graph with zero effort. Let the browser do the work.
        </p>
        <Button className="px-6 py-4 text-lg font-medium" onClick={handleInstallClick}>
          ➕ Install Chrome Extension
        </Button>
        {/* <Button effect="expandIcon" icon={ArrowRightIcon} iconPlacement="right">
  Icon right
</Button>; */}
      </div>
    </div>
  );
}
