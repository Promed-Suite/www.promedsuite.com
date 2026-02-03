import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getSession } from "@/lib/auth/auth";

export default async function LoginPage() {
  const { data: session } = await getSession();

  if (session?.session) {
    redirect("/");
  }

  return (
    <div className="bg-[url(/img/9175929_1099.jpg)] bg-no-repeat bg-cover flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-6xl">
        <LoginForm />
      </div>
    </div>
  );
}
