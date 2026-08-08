import { notFound } from "next/navigation";
import { typeMeta } from "../../../constants/typeMeta";
import { getResources } from "../../../api/resources";
import ResourceHeader from "../[type]/ResourceHeader/ResourceHeader";
import GalleryGrid from "../../layout/GalleryGrid/GalleryGrid";
import ResourceGrid from "../[type]/ResourceGrid/ResourceGrid";
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

  const { label: galleryLabel, description: galleryDescription } = meta;

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

  return (
    <div className={styles.gallery}>
      <GalleryGrid />
      <ResourceHeader
        headerLabel={galleryLabel}
        headerDescription={galleryDescription}
      />
      <ResourceGrid resources={filteredResources} />
    </div>
  );
}
