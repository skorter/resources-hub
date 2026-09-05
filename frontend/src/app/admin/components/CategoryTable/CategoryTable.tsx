"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/api/categories";
import type { Category, Resource } from "@/lib/types";
import styles from "./CategoryTable.module.scss";
import { SquarePen, Trash2 } from "lucide-react";

interface CategoryTableProps {
  categories: Category[];
  resources: Resource[];
}

export default function CategoryTable({
  categories,
  resources,
}: CategoryTableProps) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<{
    name: string;
  } | null>(null);

  const router = useRouter();

  async function handleSave(category: Category | null) {
    if (!category) return;

    const toUpdate = {
      name: category.name,
    };

    const updatedCategory = await updateCategory(category.id, toUpdate);
    if ("error" in updatedCategory) {
      alert(updatedCategory.error);
      return;
    }
    setEditingCategory(null);
    router.refresh();
  }

  async function handleAdd(draft: typeof newCategory) {
    if (!draft) return;

    const toCreate = {
      name: draft.name,
    };

    const createdCategory = await createCategory(toCreate);
    if ("error" in createdCategory) {
      alert(createdCategory.error);
      return;
    }
    setNewCategory(null);
    router.refresh();
  }

  async function handleDelete(categoryId: number) {
    const confirmed = confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;

    const deletedCategory = await deleteCategory(categoryId);
    if ("error" in deletedCategory) {
      alert(`Error: ${deletedCategory.error}`);
      return;
    }
    router.refresh();
  }

  return (
    <section className={styles.categoryTable}>
      <div className={styles.header}>
        <div>
          <h1>Category Table</h1>
          <p className={styles.resourceCount}>
            <span className={styles.count}>{categories.length} </span>categories
          </p>
        </div>

        <button
          className={styles.addButton}
          onClick={() => setNewCategory({ name: "" })}
        >
          Add Category
        </button>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHeaderRow}>
          <tr className={styles.tableHeaderRow}>
            <th className={styles.tableHeaderCell}>ID</th>
            <th className={styles.tableHeaderCell}>Name</th>
            <th className={styles.tableHeaderCell}>Resources</th>
            <th className={styles.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newCategory && (
            <tr className={styles.tableRow}>
              <td className={styles.tableCell}>
                {/* ID will be assigned after creation */}
              </td>
              <td className={styles.tableCell}>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      name: e.target.value,
                    })
                  }
                />
              </td>
              <td className={styles.tableCell}>
                {/* Resources will be assigned after creation */}
              </td>
              <td className={styles.tableCell}>
                <button
                  className={styles.saveButton}
                  onClick={() => handleAdd(newCategory)}
                >
                  Add
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => setNewCategory(null)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          )}
          {categories
            .sort((a, b) => a.id - b.id)
            .map((category) => (
              <tr key={category.id} className={styles.tableRow}>
                <td className={styles.tableCell}>{category.id}</td>
                <td className={styles.tableCell}>
                  {editingCategory?.id === category.id ? (
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className={styles.tableCell}>
                  {resources
                    .filter((resource) =>
                      resource.categories.some((c) => c.id === category.id),
                    )
                    .map((resource) => resource.title)
                    .join(" | ")}
                </td>
                <td className={styles.tableCell}>
                  {editingCategory?.id === category.id ? (
                    <div className={styles.actionsRow}>
                      <button
                        className={styles.saveButton}
                        onClick={() => handleSave(editingCategory)}
                      >
                        Save
                      </button>
                      <button
                        className={styles.cancelButton}
                        onClick={() => setEditingCategory(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className={styles.actionsRow}>
                      <button
                        className={styles.editButton}
                        onClick={() => setEditingCategory(category)}
                      >
                        <SquarePen className={styles.icon} />
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className={styles.icon} />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
}
