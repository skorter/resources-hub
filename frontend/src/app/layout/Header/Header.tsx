"use client";
import { useParams, usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { Layers, Sun, Moon, ArrowRight, ArrowLeft } from "lucide-react";
import { typeMeta } from "../../../constants/typeMeta";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const params = useParams();
  const type = params.type as string | undefined;
  const normalizedType = type
    ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    : undefined;

  const galleryLabel = normalizedType
    ? typeMeta[normalizedType as keyof typeof typeMeta].label
    : undefined;

  const isOnGalleryPage = pathname.startsWith("/collections");
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
            <Link
              href="/"
              className={`${styles.link} ${styles["back-to-all-galleries"]}`}
            >
              <ArrowLeft className={styles.icon} /> back to all collections
            </Link>
          </li>
        ) : (
          <>
            <button
              className={styles.themeToggle}
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            >
              <Sun className="sunIcon" />
              <Moon className="moonIcon" />
            </button>
            <li>
              <Link href="/resources" className={styles.link}>
                All resources
              </Link>
            </li>
            <li>
              <Link href="/categories" className={styles.link}>
                By category
              </Link>
            </li>
            <li>
              <Link
                href="/suggest-resource"
                className={`${styles.link} ${styles["suggest-resource"]}`}
              >
                Suggest resource <ArrowRight className={styles.icon} />
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}
