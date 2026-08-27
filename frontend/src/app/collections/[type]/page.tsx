import { notFound } from "next/navigation";
import { typeMeta } from "../../../constants/typeMeta";
import { getResources } from "../../../api/resources";
import { getCategories } from "../../../api/categories";
import ResourceHeader from "../[type]/ResourceHeader/ResourceHeader";
import GalleryGrid from "../../layout/GalleryGrid/GalleryGrid";
import GalleryContent from "./GalleryContent";
import styles from "./page.module.scss";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  const normalizedType =
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

  const meta = typeMeta[normalizedType as keyof typeof typeMeta];

  if (!meta) {
    notFound();
  }

  const {
    label: galleryLabel,
    description: galleryDescription,
    color: galleryColor,
  } = meta;

  const resources = await getResources();

  if (!resources) {
    return <p>Loading...</p>;
  }

  if ("error" in resources) {
    return <p>Error: {resources.error}</p>;
  }

  const filteredResources = resources.filter(
    (resource) => resource.type === normalizedType,
  );

  const categories = await getCategories();

  if (!categories) {
    return <p>Loading...</p>;
  }

  if ("error" in categories) {
    return <p>Error: {categories.error}</p>;
  }

  const filteredCategories = categories.filter((category) =>
    filteredResources.some((resource) =>
      resource.categories.some(
        (resourceCategory) => resourceCategory.id === category.id,
      ),
    ),
  );

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryGrid}>
        <GalleryGrid />
      </div>

      <div className={styles.content}>
        <ResourceHeader
          headerLabel={galleryLabel}
          headerDescription={galleryDescription}
          galleryColor={galleryColor}
        />
        <GalleryContent
          resources={filteredResources}
          categories={filteredCategories}
          galleryColor={galleryColor}
        />
      </div>
    </div>
  );
}
