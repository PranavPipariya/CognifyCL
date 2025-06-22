
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const installed = localStorage.getItem("cognify_installed");
    if (installed === "true") {
      router.push("/dashboard");
    } else {
      router.push("/main");
    }
  }, [router]);

  return null;
}
