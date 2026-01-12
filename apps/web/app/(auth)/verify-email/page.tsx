import VerifyEmailForm from "@/components/verify-email-form";

export default async function VerifyEmailPage() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <VerifyEmailForm />
      </div>
    </div>
  );
}
