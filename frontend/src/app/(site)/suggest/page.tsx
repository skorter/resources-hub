"use client";
import { useState } from "react";
import { createSuggestion } from "@/api/suggest";
import type { Suggestion } from "../../../lib/types";
import ResourceCard from "../collections/[type]/ResourceGrid/ResourceCard/ResourceCard";
import styles from "./page.module.scss";

function getHostname(url: string): string | undefined {
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

export default function Suggest() {
  const [isValid, setIsValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [draft, setDraft] = useState<Suggestion>({
    name: undefined,
    title: "",
    url: "",
    description: "",
  });

  const hostname = getHostname(draft.url);
  const logo = hostname ? `https://geticon.dev/?url=${hostname}` : undefined;

  const preview = {
    title: draft.title || "Exalidraw",
    description:
      draft.description ||
      "A collaborative whiteboard tool that allows teams to brainstorm and plan visually.",
    url: draft.url || "https://excalidraw.com/",
    logo: logo || `https://geticon.dev/?url=excalidraw.com`,
  };

  return (
    <section className={styles.suggest}>
      <div className={styles.header}>
        <h1 className={styles.title}>Suggest a Resource</h1>
        <p className={styles.description}>
          If you would like to suggest a resource, please fill out the form
          below.
        </p>
      </div>
      <div className={styles.formContainer}>
        <p className={styles.sectionLabel}>Form</p>
        <form
          className={styles.form}
          onChange={(e) => setIsValid(e.currentTarget.checkValidity())}
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            const result = await createSuggestion(draft);
            if ("success" in result) {
              setHasSucceeded(true);
              alert(result.success);
              setDraft({
                name: undefined,
                title: "",
                url: "",
                description: "",
              });
            } else {
              alert(result.error);
            }
            setSubmitting(false);
          }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Your Name (optional)
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
              placeholder="e.g. John Doe"
              value={draft.name || ""}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              className={styles.input}
              type="text"
              id="title"
              name="title"
              required
              placeholder={preview.title}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="url" className={styles.label}>
              URL
            </label>
            <input
              className={styles.input}
              type="url"
              id="url"
              name="url"
              required
              placeholder={preview.url}
              value={draft.url}
              onChange={(e) => setDraft({ ...draft, url: e.target.value })}
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.textareaGroup}`}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              className={styles.input}
              id="description"
              name="description"
              placeholder={preview.description}
              required
              value={draft.description}
              onChange={(e) =>
                setDraft({ ...draft, description: e.target.value })
              }
            ></textarea>
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={!isValid || submitting || hasSucceeded}
          >
            {submitting
              ? "Submitting..."
              : hasSucceeded
                ? "Submitted successfully!"
                : "Submit"}
          </button>
        </form>
      </div>
      <div className={styles.preview}>
        <p className={styles.sectionLabel}>Preview</p>
        <div className={styles.resourceCard}>
          <ResourceCard
            resource={{
              id: 0,
              type: "Tools",
              ...preview,
              categories: [],
              status: undefined,
              createdAt: "",
            }}
          />
        </div>
      </div>
    </section>
  );
}
