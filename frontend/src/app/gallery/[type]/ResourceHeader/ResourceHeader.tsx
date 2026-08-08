interface ResourceHeaderProps {
  headerLabel: string;
  headerDescription: string;
}

import styles from "./ResourceHeader.module.scss";

export default function ResourceHeader({
  headerLabel,
  headerDescription,
}: ResourceHeaderProps) {
  return (
    <section className={styles.header}>
      <h2 className={styles.label}>{headerLabel}</h2>
      <p className={styles.description}>{headerDescription}</p>
    </section>
  );
}
