"use client";
import { useParams, usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { Layers } from "lucide-react";
import { typeMeta } from "../../../constants/typeMeta";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const params = useParams();
  const type = params.type as string | undefined;
  const normalizedType = type
    ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    : undefined;

  const galleryLabel = normalizedType
    ? typeMeta[normalizedType as keyof typeof typeMeta].label
    : undefined;

  const isOnGalleryPage = pathname.startsWith("/gallery");
  const isOnResourcesPage = pathname === "/resources";
  const isOnCategoriesPage = pathname === "/categories";

  const showBackToAllGalleriesLink =
    isOnGalleryPage || isOnResourcesPage || isOnCategoriesPage;

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Layers className={styles.icon} />
        <p className={styles.title}>
          Resource Hub{" "}
          {galleryLabel && (
            <span className={styles.label}>/ {galleryLabel}</span>
          )}
        </p>
      </div>
      <ul className={styles.nav}>
        {showBackToAllGalleriesLink ? (
          <li>
            <Link href="/">back to all galleries</Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/resources">all resources</Link>
            </li>
            <li>
              <Link href="/categories">by category</Link>
            </li>
            <li>
              <Link href="/suggest-resource">suggest resource</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
