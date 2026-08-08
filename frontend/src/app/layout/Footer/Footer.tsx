import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        built with 𖹭 by{" "}
        <a
          className={styles.link}
          href="https://github.com/skorter"
          target="_blank"
          rel="noopener noreferrer"
        >
          skorter
        </a>
      </p>
    </footer>
  );
}
