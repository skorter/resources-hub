import styles from "./page.module.scss";
import GalleryGrid from "../(site)/layout/GalleryGrid/GalleryGrid";
import Hero from "../(site)/components/Hero/Hero";
import Stats from "../(site)/components/Stats/Stats";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <GalleryGrid />
      <Stats />
    </div>
  );
}
