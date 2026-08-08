import styles from "./GalleryGrid.module.scss";
import { typeMeta } from "../../../constants/typeMeta";
import Link from "next/link";

export default function GalleryGrid() {
  const types = Object.entries(typeMeta);

  return (
    <section className={styles.galleryGrid}>
      {types.map(([type, { icon: Icon, label, description }]) => (
        <Link
          key={type}
          className={styles.card}
          href={`/gallery/${type.toLowerCase()}`}
        >
          <Icon className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>{label}</h2>
          <p>{description}</p>
        </Link>
      ))}
    </section>
  );
}
