import AuthView from "@/features/auth/components/AuthView";
import LoginForm from "@/features/auth/components/LoginForm";

export default function Page() {
  return (
    <section>
      <AuthView>
        <LoginForm />
      </AuthView>
    </section>
  );
}
