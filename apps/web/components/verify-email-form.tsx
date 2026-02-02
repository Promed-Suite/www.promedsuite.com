"use client";

import { createAuthClient } from "better-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { Suspense } from "react";

import { BetterAuthActionButton } from "@workspace/ui/components/better-auth-action-button";
import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@workspace/ui/components/field";
import { Icons } from "@workspace/ui/components/icons";
import { Spinner } from "@workspace/ui/components/spinner";

export type IVerifyEmailFormProps = object;

// Extract the component that uses useSearchParams into a separate component
function VerifyEmailFormContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const { sendVerificationEmail } = createAuthClient();

  const [timeToNextResend, setTimeToNextResend] = React.useState(30);
  const interval = React.useRef<NodeJS.Timeout>(undefined);

  React.useEffect(() => {
    startEmailVerificationCountdown();

    // Cleanup interval on unmount
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  function startEmailVerificationCountdown(time = 30) {
    setTimeToNextResend(time);

    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        const newT = t - 1;

        if (newT <= 0) {
          clearInterval(interval.current);
          return 0;
        }
        return newT;
      });
    }, 1000);
  }

  return (
    <div className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <Link href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex size-8 items-center justify-center rounded-md">
              <div className="border border-sidebar-primary/10 text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                <Icons.logo className="size-6" />
              </div>
            </div>
            <span className="sr-only">Promed Suite</span>
          </Link>
          <div className="text-xl font-bold">Verify your email</div>
          <FieldDescription>
            We've sent a verification link to your email address. Please check
            your inbox and click the link to verify your account.
          </FieldDescription>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">
              Didn't receive the email?
            </strong>
            <br />
            Check your spam folder or request a new verification link below.
          </p>
        </div>

        <Field>
          <BetterAuthActionButton
            variant="outline"
            className="w-full"
            successMessage="Verification email sent!"
            disabled={timeToNextResend > 0}
            action={async () => {
              startEmailVerificationCountdown();
              return sendVerificationEmail({
                email,
                callbackURL: "http://localhost:3000/",
              });
            }}
          >
            {timeToNextResend > 0
              ? `Resend email in ${timeToNextResend}s`
              : "Resend verification email"}
          </BetterAuthActionButton>
        </Field>
      </FieldGroup>

      <FieldDescription className="px-6 text-center">
        Need help?
        {" "}
        <Link href="/support">Contact support</Link>
      </FieldDescription>
    </div>
  );
}

// Loading component for the Suspense fallback
function VerifyEmailFormLoading() {
  return (
    <div className="flex flex-col gap-6">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-8 items-center justify-center rounded-md">
            <div className="border border-sidebar-primary/10 text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
              <Icons.logo className="size-6" />
            </div>
          </div>
          <div className="text-xl font-bold">Verify your email</div>
          <FieldDescription>
            Loading verification details...
          </FieldDescription>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">
              Please wait
            </strong>
            <br />
            Loading your email information...
          </p>
        </div>

        <Field>
          <Button
            variant="outline"
            className="w-full"
            disabled={true}
          >
            <Spinner />
            Loading...
          </Button>
        </Field>
      </FieldGroup>

      <FieldDescription className="px-6 text-center">
        Need help?
        {" "}
        <Link href="/support">Contact support</Link>
      </FieldDescription>
    </div>
  );
}

export default function VerifyEmailForm(_: IVerifyEmailFormProps) {
  return (
    <Suspense fallback={<VerifyEmailFormLoading />}>
      <VerifyEmailFormContent />
    </Suspense>
  );
}

// "use client";

// import { createAuthClient } from "better-auth/react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import * as React from "react";

// import { BetterAuthActionButton } from "@workspace/ui/components/better-auth-action-button";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
// } from "@workspace/ui/components/field";
// import { Icons } from "@workspace/ui/components/icons";

// export type IVerifyEmailFormProps = object;

// export default function VerifyEmailForm(_: IVerifyEmailFormProps) {
//   const searchParams = useSearchParams();
//   const email = searchParams.get("email") || "";

//   const { sendVerificationEmail } = createAuthClient();

//   const [timeToNextResend, setTimeToNextResend] = React.useState(30);
//   const interval = React.useRef<NodeJS.Timeout>(undefined);

//   React.useEffect(() => {
//     startEmailVerificationCountdown();
//   }, []);

//   function startEmailVerificationCountdown(time = 30) {
//     setTimeToNextResend(time);

//     clearInterval(interval.current);
//     interval.current = setInterval(() => {
//       setTimeToNextResend((t) => {
//         const newT = t - 1;

//         if (newT <= 0) {
//           clearInterval(interval.current);
//           return 0;
//         }
//         return newT;
//       });
//     }, 1000);
//   }

//   return (
//     <div className="flex flex-col gap-6">
//       <FieldGroup>
//         <div className="flex flex-col items-center gap-2 text-center">
//           <Link href="#" className="flex flex-col items-center gap-2 font-medium">
//             <div className="flex size-8 items-center justify-center rounded-md">
//               <div className="border border-sidebar-primary/10 text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
//                 <Icons.logo className="size-6" />
//               </div>
//               {/* <Icons.logo className="size-6" /> */}
//             </div>
//             <span className="sr-only">Promed Suite</span>
//           </Link>
//           {/* <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
//             <MailCheck className="size-6 text-primary" />
//           </div> */}
//           <div className="text-xl font-bold">Verify your email</div>
//           <FieldDescription>
//             We've sent a verification link to your email address. Please check
//             your inbox and click the link to verify your account.
//           </FieldDescription>
//         </div>

//         <div className="rounded-lg border border-border bg-muted/50 p-4">
//           <p className="text-sm text-muted-foreground">
//             <strong className="text-foreground">
//               Didn't receive the email?
//             </strong>
//             <br />
//             Check your spam folder or request a new verification link below.
//           </p>
//         </div>

//         {/* {resendSuccess && (
//           <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200">
//             Verification email sent successfully! Please check your inbox.
//           </div>
//         )} */}

//         <Field>
//           <BetterAuthActionButton
//             variant="outline"
//             className="w-full"
//             successMessage="Verification email sent!"
//             disabled={timeToNextResend > 0}
//             action={async () => {
//               startEmailVerificationCountdown();
//               return sendVerificationEmail({
//                 email,
//                 callbackURL: "http://localhost:3000/",
//               });
//             }}
//           >
//             {timeToNextResend > 0
//               ? `Resend email in ${timeToNextResend}s`
//               : "Resend verification email"}
//           </BetterAuthActionButton>
//         </Field>
//       </FieldGroup>

//       <FieldDescription className="px-6 text-center">
//         Need help?
//         {" "}
//         <Link href="/support">Contact support</Link>
//       </FieldDescription>
//     </div>
//   );
// }
