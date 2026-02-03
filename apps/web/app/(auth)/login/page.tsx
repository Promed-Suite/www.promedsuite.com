import Image from "next/image";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login-form";
import { getSession } from "@/lib/auth/auth";

export default async function LoginPage() {
  const { data: session } = await getSession();

  if (session?.session) {
    redirect("/");
  }

  return (
    <div className="relative flex h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/9175929_1099.webp"
          alt="Background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
