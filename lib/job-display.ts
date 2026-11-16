import {
  Briefcase,
  Code2,
  Megaphone,
  Palette,
  Settings2,
  type LucideIcon,
} from "lucide-react"

/**
 * Display helpers shared by every surface that renders job posts
 * (dashboard tables, browse cards, …).
 */

/** Category → icon chip, with Briefcase as the fallback. */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Engineering & Tech": Code2,
  "Design & Creative": Palette,
  Marketing: Megaphone,
  Sales: Megaphone,
  "Human Resources": Briefcase,
  "Finance & Accounting": Briefcase,
  "Customer Support": Briefcase,
  Operations: Settings2,
}

/** Category → chip colors, gray for unknown categories. */
export const CATEGORY_TONES: Record<string, string> = {
  "Engineering & Tech": "bg-[#6366F1]/10 text-[#8B8BF5]",
  "Design & Creative": "bg-[#F472B6]/10 text-[#F472B6]",
  Marketing: "bg-[#F59E0B]/10 text-[#F59E0B]",
  Sales: "bg-[#F59E0B]/10 text-[#F59E0B]",
  "Human Resources": "bg-[#22C55E]/10 text-[#22C55E]",
  "Finance & Accounting": "bg-[#60A5FA]/10 text-[#60A5FA]",
  "Customer Support": "bg-[#60A5FA]/10 text-[#60A5FA]",
  Operations: "bg-[#22C55E]/10 text-[#22C55E]",
}

/** Frequency → short unit shown after a salary range. */
export const FREQ_SHORT: Record<string, string> = {
  "per hour": "hr",
  "per day": "day",
  "per month": "mo",
  "per year": "yr",
}

/** Format one salary end as the app currency, "—" when missing. */
export const formatSalary = (value: string, frequency: string) => {
  const amount = Number(value)
  if (value === "" || !Number.isFinite(amount)) return "—"
  if (frequency === "per year" && amount >= 1000) {
    return `€${Math.round(amount / 1000)}k`
  }
  return `€${amount}`
}
