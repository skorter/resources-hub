import styles from "./page.module.scss";
import { getCategories } from "../../api/categories";

export default async function Categories() {
  const categories = await getCategories();

  if (!categories) {
    return <p>Loading...</p>;
  }

  if ("error" in categories) {
    return <p>Error: {categories.error}</p>;
  }

  return (
    <section className={styles.categories}>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </section>
  );
}
