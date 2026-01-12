// "use client";

// import * as React from "react";

// import { useForm } from "@tanstack/react-form";
// import { toast } from "sonner";
// import * as z from "zod";

// import { authClient } from "@/lib/auth-client";
// import { Button } from "@workspace/ui/components/button";
// import {
//   Field,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@workspace/ui/components/field";
// import { Icons } from "@workspace/ui/components/icons";
// import { Input } from "@workspace/ui/components/input";
// import { LoadingSwap } from "@workspace/ui/components/loading-swap";
// import { cn } from "@workspace/ui/lib/utils";

// const forgotPasswordFormSchema = z.object({
//   email: z.string().email(),
// });

// export function ForgotPasswordForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [isLoading, setIsLoading] = React.useState(false);

//   const form = useForm({
//     defaultValues: {
//       email: "",
//     },
//     validators: {
//       onChange: forgotPasswordFormSchema,
//     },
//     onSubmit: async ({ value }) => {
//       setIsLoading(true);
//       await authClient.requestPasswordReset(
//         {
//           email: value.email,
//           redirectTo: "http://localhost:3000/reset-password",
//         },
//         {
//           onError: (error) => {
//             setIsLoading(false);
//             toast.error(error.error.message || "Failed to sign in");
//           },
//           onSuccess: () => {
//             toast.success(
//               "Password reset email sent! Please check your inbox."
//             );
//             startEmailVerificationCountdown();
//           },
//         }
//       );
//       startEmailVerificationCountdown();
//     },
//   });

//   const { isSubmitting } = form.state;

//   const [timeToNextResend, setTimeToNextResend] = React.useState(30);
//   const interval = React.useRef<NodeJS.Timeout>(undefined);

//   React.useEffect(() => {
//     return () => {
//       if (interval.current) {
//         clearInterval(interval.current);
//       }
//     };
//   }, []);

//   function startEmailVerificationCountdown(time = 30) {
//     setTimeToNextResend(time);

//     if (interval.current) {
//       clearTimeout(interval.current);
//     }
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
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <form
//         id="promed-forgot-password-form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           form.handleSubmit();
//         }}
//       >
//         <FieldGroup>
//           <div className="flex flex-col items-center gap-2 text-center">
//             <a
//               href="#"
//               className="flex flex-col items-center gap-2 font-medium"
//             >
//               <div className="flex size-8 items-center justify-center rounded-md">
//                 <div className="border border-sidebar-primary/10 text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
//                   <Icons.logo className="size-6" />
//                 </div>
//                 {/* <Icons.logo className="size-6" /> */}
//               </div>
//               <span className="sr-only">Promed Suite</span>
//             </a>
//             <h1 className="text-xl font-bold">Reset Password</h1>
//           </div>
//           <FieldDescription>
//             Enter your email address and we'll send you a link to reset your
//             password.
//           </FieldDescription>
//           <form.Field
//             name="email"
//             children={(field) => {
//               const isInvalid =
//                 field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(e) => field.handleChange(e.target.value)}
//                     placeholder="m@domain.com"
//                     autoComplete="off"
//                     required
//                   />
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           />

//           <FieldDescription>
//             Remembered your password? <a href="/login">Log in</a>
//           </FieldDescription>
//           <Field>
//             <Button
//               type="submit"
//               disabled={isSubmitting || timeToNextResend > 0}
//             >
//               <LoadingSwap isLoading={isSubmitting}>
//                 {timeToNextResend > 0
//                   ? `Resend email in ${timeToNextResend}s`
//                   : "Send Reset Email"}
//               </LoadingSwap>
//             </Button>
//           </Field>
//         </FieldGroup>
//       </form>
//     </div>
//   );
// }

"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import * as z from "zod";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field";
import { Icons } from "@workspace/ui/components/icons";
import { Input } from "@workspace/ui/components/input";
import { LoadingSwap } from "@workspace/ui/components/loading-swap";
import { cn } from "@workspace/ui/lib/utils";

const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // const [isLoading, setIsLoading] = React.useState(false);

  // Add state for resend timer
  const [timeToNextResend, setTimeToNextResend] = React.useState(0);
  const interval = React.useRef<NodeJS.Timeout>(undefined);

  // Cleanup interval on unmount
  React.useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  // Timer function
  const startEmailVerificationCountdown = React.useCallback((time = 30) => {
    setTimeToNextResend(time);

    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        if (t <= 1) {
          clearInterval(interval.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: forgotPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.requestPasswordReset(
        {
          email: value.email,
          redirectTo: "http://localhost:3000/reset-password",
        },
        {
          onError: (error) => {
            toast.error(error.error.message || "Failed to send reset email");
          },
          onSuccess: () => {
            toast.success(
              "Password reset email sent! Please check your inbox.",
            );
            startEmailVerificationCountdown(30); // Start countdown on success
          },
        },
      );
    },
  });

  // You need to get the form state correctly
  const isSubmitting = form.state.isSubmitting;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        id="promed-forgot-password-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <div className="border border-sidebar-primary/10 text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                  <Icons.logo className="size-6" />
                </div>
              </div>
              <span className="sr-only">Promed Suite</span>
            </Link>
            <h1 className="text-xl font-bold">Reset Password</h1>
          </div>
          <FieldDescription>
            Enter your email address and we'll send you a link to reset your
            password.
          </FieldDescription>

          <form.Field
            name="email"
            children={(field) => {
              const isInvalid
                = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="m@domain.com"
                    autoComplete="off"
                    required
                    disabled={isSubmitting || timeToNextResend > 0}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <FieldDescription>
            Remembered your password?
            {" "}
            <Link href="/login">Log in</Link>
          </FieldDescription>

          <Field>
            <Button
              type="submit"
              disabled={isSubmitting || timeToNextResend > 0}
              className="w-full"
            >
              <LoadingSwap isLoading={isSubmitting}>
                {timeToNextResend > 0
                  ? `Resend email in ${timeToNextResend}s`
                  : "Send Reset Email"}
              </LoadingSwap>
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
