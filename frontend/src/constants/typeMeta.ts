import type { Type } from "../../../backend/src/generated/prisma/enums";
import { type LucideIcon } from "lucide-react";
import {
  Wrench,
  BookText,
  Package,
  Sparkles,
  Globe,
  Puzzle,
  Mails,
} from "lucide-react";

export const typeMeta: Record<
  Type,
  { label: string; icon: LucideIcon; description: string; color: string }
> = {
  Tools: {
    label: "Tools",
    icon: Wrench,
    description: "Design and development utilities",
    color: "#e8b23d",
  },
  References: {
    label: "References",
    icon: BookText,
    description: "Docs, specs, and cheatsheets",
    color: "#e8946b",
  },
  Libraries: {
    label: "Libraries",
    icon: Package,
    description: "Assets, frameworks, and kits",
    color: "#d9668f",
  },
  Inspiration: {
    label: "Inspiration",
    icon: Sparkles,
    description: "Galleries, showcases, and ideas",
    color: "#a970c9",
  },
  Services: {
    label: "Services",
    icon: Globe,
    description: "APIs, hosting, and platforms",
    color: "#4a90d9",
  },
  Extensions: {
    label: "Extensions",
    icon: Puzzle,
    description: "VS Code add-ons and plugins",
    color: "#8a6ad9",
  },
  Social: {
    label: "Social",
    icon: Mails,
    description: "Forums and newsletters",
    color: "#6a7ad9",
  },
};
