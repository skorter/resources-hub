import styles from "./page.module.scss";
import GalleryGrid from "./layout/GalleryGrid/GalleryGrid";
import Hero from "../app/components/Hero/Hero";
import Stats from "../app/components/Stats/Stats";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <GalleryGrid />
      <Stats />
    </div>
  );
}
