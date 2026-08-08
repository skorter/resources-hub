import type { Type } from "../../../backend/src/generated/prisma/enums";
import { type LucideIcon } from "lucide-react";
import {
  Wrench,
  BookOpen,
  Package,
  Sparkles,
  Globe,
  Puzzle,
  Mails,
} from "lucide-react";

export const typeMeta: Record<
  Type,
  { label: string; icon: LucideIcon; description: string }
> = {
  Tools: {
    label: "Tools",
    icon: Wrench,
    description: "Design and dev utilities",
  },
  Docs: {
    label: "References",
    icon: BookOpen,
    description: "Docs, specs, and cheatsheets",
  },
  Libraries: {
    label: "Libraries",
    icon: Package,
    description: "Assets, frameworks, and kits",
  },
  Inspiration: {
    label: "Inspiration",
    icon: Sparkles,
    description: "Galleries, showcases, and ideas",
  },
  Services: {
    label: "Services",
    icon: Globe,
    description: "APIs, hosting, and platforms",
  },
  Extensions: {
    label: "Extensions",
    icon: Puzzle,
    description: "VS Code add-ons and plugins",
  },
  Social: {
    label: "Social",
    icon: Mails,
    description: "Forums, communities, and newsletters",
  },
};
