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

  const totalResources = Math.floor(resources.length);
  const totalGalleries = Object.keys(typeMeta).length;
  const totalCategories = Math.floor(categories.length);

  return (
    <section className={styles.stats}>
      <ul className={styles.statsList}>
        <li className={styles.statItem}>{totalResources}+ Resources</li>
        <li className={styles.statItem}>{totalGalleries} Galleries</li>
        <li className={styles.statItem}>{totalCategories} Categories</li>
        <li className={styles.statItem}>No account required</li>
        <li className={styles.statItem}>No paid promotions</li>
      </ul>
    </section>
  );
}
