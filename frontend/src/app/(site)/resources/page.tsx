import styles from "./page.module.scss";
import { getResources } from "../../../api/resources";
import ResourceGrid from "../collections/[type]/ResourceGrid/ResourceGrid";

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
      <ResourceGrid resources={resources} />
    </section>
  );
}
