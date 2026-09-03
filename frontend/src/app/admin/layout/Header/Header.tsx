"use client";
import { useRouter } from "next/navigation";
import { createLogout } from "@/api/auth";
import styles from "./Header.module.scss";
import { Box, LogOut } from "lucide-react";

export default function Header() {
  const router = useRouter();
  return (
    <section className={styles.header}>
      <div className={styles.left}>
        <Box className={styles.icon} />
        <h2 className={styles.title}>Admin Portal</h2>
      </div>
      <button
        className={styles.logoutButton}
        onClick={async () => {
          await createLogout();
          router.push("/admin/login");
          alert("Logout successful");
        }}
      >
        <LogOut className={styles.icon} />
        Log Out
      </button>
    </section>
  );
}
