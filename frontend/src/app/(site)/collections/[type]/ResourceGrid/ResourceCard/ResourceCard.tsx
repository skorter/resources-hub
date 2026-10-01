import Link from "next/link";
import Image from "next/image";
import styles from "./ResourceCard.module.scss";
import type { Resource } from "../../../../../../lib/types";
import { categoryMeta } from "../../../../../../constants/categoryMeta";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className={styles.resourceCard}>
      <Link
        className={styles.link}
        href={`${resource.url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* <span className={styles.status}>Freemium</span> */}
        {resource.status ? (
          <span className={styles.status}>{resource.status.name}</span>
        ) : null}
        {resource.logo ? (
          <Image
            className={styles.logo}
            src={resource.logo}
            alt={resource.title}
            width={64}
            height={64}
          />
        ) : (
          <div className={styles.placeholderLogo}>No Logo</div>
        )}
        <h2 className={styles.title}>{resource.title}</h2>
        <p className={styles.description}>{resource.description}</p>
        <ul className={styles.categories}>
          {resource.categories.map((category) => (
            <li
              key={category.id}
              className={styles.category}
              style={
                {
                  "--category-color": categoryMeta[category.name]?.color,
                } as React.CSSProperties
              }
            >
              {category.name}
            </li>
          ))}
        </ul>
      </Link>
    </article>
  );
}
