import styles from "./page.module.scss";
import { getResources } from "../../api/resources";

export default async function Resources() {
  const resources = await getResources();

  if (!resources) {
    return <p>Loading...</p>;
  }

  if ("error" in resources) {
    return <p>Error: {resources.error}</p>;
  }

  return (
    <section className={styles.resources}>
      {resources.map((resource) => (
        <div key={resource.id}>{resource.title}</div>
      ))}
    </section>
  );
}
