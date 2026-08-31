interface ResourceHeaderProps {
  headerLabel: string;
  headerDescription: string;
  galleryColor: string;
}

import styles from "./ResourceHeader.module.scss";

export default function ResourceHeader({
  headerLabel,
  headerDescription,
  galleryColor,
}: ResourceHeaderProps) {
  return (
    <section className={styles.header}>
      <h2
        className={styles.label}
        style={{ color: galleryColor } as React.CSSProperties}
      >
        {headerLabel}
      </h2>
      <p className={styles.description}>{headerDescription}</p>
    </section>
  );
}
