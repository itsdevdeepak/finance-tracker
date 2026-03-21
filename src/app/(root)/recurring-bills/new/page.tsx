import { recurringBillFormAction } from "@/features/recurring-bills/action";
import RecurringBillForm from "@/features/recurring-bills/components/RecurringBillForm";
import { NewForm } from "@/features/recurring-bills/constants";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <RecurringBillForm
        action={recurringBillFormAction}
        heading={NewForm.heading}
        description={NewForm.description}
      />
    </section>
  );
}
