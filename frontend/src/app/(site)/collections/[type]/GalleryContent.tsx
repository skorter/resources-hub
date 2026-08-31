"use client";
import { useState } from "react";
import { type Resource, type Category } from "../../../../lib/types";
import ResourceGrid from "./ResourceGrid/ResourceGrid";
import ResourceFinder from "./ResourceFinder/ResourceFinder";

interface GalleryContentProps {
  resources: Resource[];
  categories: Category[];
  galleryColor: string;
}

export default function GalleryContent({
  resources,
  categories,
  galleryColor,
}: GalleryContentProps) {
  const [searchInput, setSearchInput] = useState("");
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const resultResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchInput.toLocaleLowerCase()) &&
      (activeCategories.length === 0 ||
        activeCategories.every((activeCategory) =>
          resource.categories.some(
            (category) => category.name === activeCategory,
          ),
        )),
  );

  const amount = resultResources.length;

  function toggleCategories(name: string) {
    if (activeCategories.includes(name)) {
      setActiveCategories(
        activeCategories.filter((category) => category !== name),
      );
    } else {
      setActiveCategories([...activeCategories, name]);
    }
  }

  return (
    <>
      <ResourceFinder
        resources={resources}
        categories={categories}
        galleryColor={galleryColor}
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        activeCategories={activeCategories}
        onToggleCategory={toggleCategories}
        amount={amount}
      />
      <ResourceGrid resources={resultResources} />
    </>
  );
}
