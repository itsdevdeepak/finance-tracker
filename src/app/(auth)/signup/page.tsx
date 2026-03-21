import AuthView from "@/features/auth/components/AuthView";
import SignupForm from "@/features/auth/components/SignupForm";

export default function Page() {
  return (
    <section aria-label="Create user">
      <AuthView>
        <SignupForm />
      </AuthView>
    </section>
  );
}
