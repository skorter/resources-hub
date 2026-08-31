import styles from "./ResourceGrid.module.scss";
import { type Resource } from "../../../../../lib/types";
import ResourceCard from "./ResourceCard/ResourceCard";

interface ResourceGridProps {
  resources: Resource[];
}

export default function ResourceGrid({ resources }: ResourceGridProps) {
  return (
    <section className={styles.resourceGrid}>
      {resources.length > 0 ? (
        <ul className={styles.resourceList}>
          {resources.map((resource) => (
            <li key={resource.id} className={styles.resourceListItem}>
              <ResourceCard resource={resource} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources found.</p>
      )}
    </section>
  );
}
