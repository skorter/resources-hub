import styles from "./Stats.module.scss";
import { getResources } from "../../../api/resources";
import { typeMeta } from "../../../constants/typeMeta";
import { getCategories } from "../../../api/categories";

export default async function Stats() {
  const resources = await getResources();
  const categories = await getCategories();

  if (!resources) {
    return <p>Loading...</p>;
  }

  if (!categories) {
    return <p>Loading...</p>;
  }

  if ("error" in resources) {
    return <p>Error: {resources.error}</p>;
  }

  if ("error" in categories) {
    return <p>Error: {categories.error}</p>;
  }

  const totalResources = Math.floor(resources.length / 5) * 5;
  const totalGalleries = Object.keys(typeMeta).length;
  const totalCategories = Math.floor(categories.length);

  return (
    <section className={styles.stats}>
      <ul className={styles.statsListTopRow}>
        <li className={styles.statItem}>
          <strong>{totalResources}+</strong> resources
        </li>
        <li className={styles.statItem}>
          <strong>{totalGalleries}</strong> galleries
        </li>
        <li className={styles.statItem}>
          <strong>{totalCategories}</strong> categories
        </li>
      </ul>
      <ul className={styles.statsListBottomRow}>
        <li className={styles.statItem}>no account required</li>
        <li className={styles.statItem}>no paid promotions</li>
      </ul>
    </section>
  );
}
