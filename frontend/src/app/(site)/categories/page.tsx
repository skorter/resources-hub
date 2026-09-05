import styles from "./page.module.scss";
import { getCategories } from "../../../api/categories";
import { getResources } from "../../../api/resources";
import ResourceGrid from "../collections/[type]/ResourceGrid/ResourceGrid";
import { categoryMeta } from "../../../constants/categoryMeta";

export default async function Categories() {
  const categories = await getCategories();
  const resources = await getResources();

  if (!categories || !resources) {
    return <p>Loading...</p>;
  }

  if ("error" in categories) {
    return <p>Error: {categories.error}</p>;
  }

  if ("error" in resources) {
    return <p>Error: {resources.error}</p>;
  }

  const uncategorizedResources = resources.filter(
    (resource) => resource.categories.length === 0,
  );

  return (
    <section className={styles.categories}>
      {categories.map((category) => {
        const categoryResources = resources.filter((resource) =>
          resource.categories.some((c) => c.id === category.id),
        );

        if (categoryResources.length === 0) {
          return null;
        }

        return (
          <div
            key={category.id}
            className={styles.categoryList}
            style={
              {
                "--category-color": categoryMeta[category.name]?.color,
              } as React.CSSProperties
            }
          >
            <h2>{category.name}</h2>
            <ResourceGrid resources={categoryResources} />
          </div>
        );
      })}
      {uncategorizedResources.length > 0 && (
        <div className={styles.categoryList}>
          <h2>Other</h2>
          <ResourceGrid resources={uncategorizedResources} />
        </div>
      )}
    </section>
  );
}
