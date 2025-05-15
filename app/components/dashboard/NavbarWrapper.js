"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./NavbarDashboard";

export default function NavbarWrapper() {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    if (!token || role !== "hr") {
      router.push("/");
    } else {
      setUserName(name || "HR");
    }
  }, [router]);

  return <Navbar userName={userName} />;
}
