import IconNavBudgets from "@/components/icons/IconNavBudgets";
import IconNavOverview from "@/components/icons/IconNavOverview";
import IconNavPots from "@/components/icons/IconNavPots";
import IconNavRecurringBills from "@/components/icons/IconNavRecurringBills";
import IconNavTransactions from "@/components/icons/IconNavTransactions";
import { IconProps } from "@/components/icons/types";

export type NavLink = {
  label: string;
  Icon: React.FC<IconProps>;
  href: string;
};

export const navLinks: NavLink[] = [
  {
    label: "Overview",
    href: "/",
    Icon: IconNavOverview,
  },
  {
    label: "Transactions",
    href: "/transactions",
    Icon: IconNavTransactions,
  },
  {
    label: "Budgets",
    href: "/budgets",
    Icon: IconNavBudgets,
  },
  {
    label: "Pots",
    href: "/pots",
    Icon: IconNavPots,
  },
  {
    label: "Recurring bills",
    href: "/recurring-bills",
    Icon: IconNavRecurringBills,
  },
];
