import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <ul className={styles.pill}>
        <li className={styles.pulse}></li>
        <li className={styles.curated}>Curated</li>
        <li className={styles.updated}>Updated weekly</li>
      </ul>
      <h1 className={styles.title}>
        Every resource a designer or developer might need,{" "}
        <span className={styles.highlight}>in one place</span>.
      </h1>
      <p className={styles.subtitle}>
        Pick a collection below to explore tools, libraries, inspiration,
        services, extensions, and communities.
      </p>
    </section>
  );
}
