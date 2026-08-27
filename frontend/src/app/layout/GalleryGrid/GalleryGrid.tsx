import styles from "./GalleryGrid.module.scss";
import { typeMeta } from "../../../constants/typeMeta";
import Link from "next/link";

export default function GalleryGrid() {
  const types = Object.entries(typeMeta);

  return (
    <section className={styles.galleryGrid}>
      {types.map(([type, { icon: Icon, label, description, color }]) => (
        <Link
          key={type}
          className={styles.card}
          href={`/collections/${type.toLowerCase()}/`}
          style={{ "--icon-color": color } as React.CSSProperties}
        >
          <div className={styles.iconWrapper}>
            <Icon className={styles.icon} />
          </div>
          <h2 className={styles.title}>{label}</h2>
          <p className={styles.description}>{description}</p>
        </Link>
      ))}
    </section>
  );
}
