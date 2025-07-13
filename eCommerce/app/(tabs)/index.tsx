import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthIndex() {
  const router = useRouter();

  useEffect(() => {;

    const timeout = setTimeout(() => {
      router.replace("/home");
    }, 0);

    return () => clearTimeout(timeout);
  }, [router]);

  return;
}
