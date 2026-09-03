"use client";
import { useState } from "react";
import ResourceTable from "../../components/ResourceTable/ResourceTable";
import StatusTable from "../../components/StatusTable/StatusTable";
import CategoryTable from "../../components/CategoryTable/CategoryTable";
import type { Resource, Status, Category } from "@/lib/types";
import styles from "./AdminTabs.module.scss";

interface AdminTabsProps {
  resources: Resource[];
  statuses: Status[];
  categories: Category[];
}

export default function AdminTabs({
  resources,
  statuses,
  categories,
}: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "resources" | "statuses" | "categories"
  >("resources");
  return (
    <section className={styles.navigation}>
      <div className={styles.tabList}>
        <button
          className={activeTab === "resources" ? styles.active : ""}
          onClick={() => setActiveTab("resources")}
        >
          Resources
        </button>
        <button
          className={activeTab === "statuses" ? styles.active : ""}
          onClick={() => setActiveTab("statuses")}
        >
          Statuses
        </button>
        <button
          className={activeTab === "categories" ? styles.active : ""}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
      </div>

      {activeTab === "resources" && (
        <ResourceTable
          resources={resources}
          statuses={statuses}
          categories={categories}
        />
      )}
      {activeTab === "statuses" && (
        <StatusTable resources={resources} statuses={statuses} />
      )}
      {activeTab === "categories" && (
        <CategoryTable resources={resources} categories={categories} />
      )}
    </section>
  );
}
