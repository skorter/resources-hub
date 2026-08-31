import styles from "./ResourceFinder.module.scss";
import { type Resource, type Category } from "../../../../../lib/types";
import { Search } from "lucide-react";
import { categoryMeta } from "../../../../../constants/categoryMeta";

interface ResourceFinderProps {
  resources: Resource[];
  categories: Category[];
  galleryColor: string;
  searchInput: string;
  onSearchChange: (value: string) => void;
  activeCategories: string[];
  onToggleCategory: (value: string) => void;
  amount: number;
}

export default function ResourceFinder({
  resources,
  categories,
  galleryColor,
  searchInput,
  onSearchChange,
  activeCategories,
  onToggleCategory,
  amount,
}: ResourceFinderProps) {
  return (
    <section className={styles.resourceFinder}>
      <div
        className={styles.searchBar}
        style={{ "--gallery-color": galleryColor } as React.CSSProperties}
      >
        <label className={styles.label}>
          <Search aria-hidden="true" className={styles.icon} />
          <input
            className={styles.input}
            type="search"
            aria-label="Search resources"
            placeholder={`Search ${resources[0]?.type ?? "resources"}...`}
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>
      </div>

      {categories.length > 0 ? (
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${activeCategories.includes(category.name) ? styles.active : ""}`}
              style={
                {
                  "--category-color": categoryMeta[category.name]?.color,
                } as React.CSSProperties
              }
              onClick={() => onToggleCategory(category.name)}
            >
              <p className={styles.categoryName}>{category.name}</p>
            </button>
          ))}
        </div>
      ) : (
        <p>No categories found for this resource collection.</p>
      )}

      <p className={styles.results}>
        <span className={styles.amount}>{amount > 0 ? amount : 0}</span>{" "}
        {amount === 1 ? "resource" : "resources"}
        {activeCategories.length > 0 && (
          <>
            {" "}
            in{" "}
            {activeCategories.map((activeCategory, index) => (
              <span
                key={activeCategory}
                className={styles.category}
                style={
                  {
                    "--category-color": categoryMeta[activeCategory]?.color,
                  } as React.CSSProperties
                }
              >
                {activeCategory}
                {index < activeCategories.length - 1 && (
                  <span className={styles.separator}>, </span>
                )}
              </span>
            ))}
          </>
        )}
        {searchInput && (
          <>
            {" "}
            for{" "}
            <span className={styles.input}>&ldquo;{searchInput}&rdquo;</span>
          </>
        )}
      </p>
    </section>
  );
}
