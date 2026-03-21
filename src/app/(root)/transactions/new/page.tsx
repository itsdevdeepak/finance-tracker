import { potFormAction } from "@/features/pots/actions";
import PotForm from "@/features/pots/components/PotForm";
import { NewForm } from "@/features/pots/constants";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <PotForm
        action={potFormAction}
        heading={NewForm.heading}
        description={NewForm.description}
      />
    </section>
  );
}
