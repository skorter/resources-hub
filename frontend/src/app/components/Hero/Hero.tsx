import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        Every resource a designer or developer needs, in one place.
      </h1>
      <p className={styles.subtitle}>
        Pick a gallery below to explore tools, libraries, inspiration, services,
        extensions, and communities — all hand-curated and kept up to date.
      </p>
    </section>
  );
}
