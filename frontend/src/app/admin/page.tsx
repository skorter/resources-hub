import { getResources } from "@/api/resources";
import { getStatuses } from "@/api/statuses";
import { getCategories } from "@/api/categories";
import Header from "./layout/Header/Header";

import AdminTabs from "./layout/AdminTabs/AdminTabs";

import styles from "./page.module.scss";

export default async function AdminPage() {
  const resources = await getResources();
  const statuses = await getStatuses();
  const categories = await getCategories();

  if (!resources) return <p>Loading...</p>;
  if ("error" in resources) return <p>Error: {resources.error}</p>;

  if (!statuses) return <p>Loading...</p>;
  if ("error" in statuses) return <p>Error: {statuses.error}</p>;

  if (!categories) return <p>Loading...</p>;
  if ("error" in categories) return <p>Error: {categories.error}</p>;

  return (
    <section className={styles.adminPage}>
      <Header />
      <AdminTabs
        resources={resources}
        statuses={statuses}
        categories={categories}
      />
    </section>
  );
}
