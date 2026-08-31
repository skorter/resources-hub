"use client";
import styles from "./page.module.scss";
import { createLogin } from "../../../api/auth";
import { Package } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <section className={styles.login}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Package className={styles.icon} />
          <h2 className={styles.title}>Resource Hub</h2>
          <h3 className={styles.subtitle}>Admin Portal</h3>
        </div>

        <form
          className={styles.form}
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const admin = {
              username: formData.get("username") as string,
              password: formData.get("password") as string,
            };
            const result = await createLogin(admin);
            if (!result.success) {
              alert(result.error);
            } else {
              alert("Login successful");
              router.push("/admin");
            }
          }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
            />
          </div>
          <button className={styles.button}>Login</button>
        </form>

        <span className={styles.warning}>
          If you are not an admin a.k.a. me, you should not be here.
        </span>
      </div>
    </section>
  );
}
