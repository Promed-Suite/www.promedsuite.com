"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Suspense } from "react";
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

const resetPasswordFormSchema = z
  .object({
    password: z.string().min(6, "Invalid password"),
    confirmPassword: z.string().min(6, "Invalid password"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// This component uses useSearchParams and should be wrapped in Suspense
function ResetPasswordFormContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: resetPasswordFormSchema,
    },
    onSubmit: async ({ value }) => {
      if (!token)
        return;

      await authClient.resetPassword(
        { newPassword: value.password, token },
        {
          onError: (error) => {
            toast.error(error.error.message || "Failed to reset password");
          },
          onSuccess: () => {
            toast.success("Password reset successful", {
              description: "Redirecting to login...",
            });
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          },
        },
      );
    },
  });

  const { isSubmitting } = form.state;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        id="promed-signUp-form"
        onSubmit={(e) => {
          e.preventDefault();
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

          {token == null || error != null
            ? (
                <>
                  <FieldDescription>
                    Invalid or expired token. Please request a new password reset.
                  </FieldDescription>
                  <Field>
                    <Button asChild className="w-full">
                      <Link href="/login">Return to login</Link>
                    </Button>
                  </Field>
                </>
              )
            : (
                <>
                  <FieldDescription>
                    Enter your new password below to reset your password.
                  </FieldDescription>

                  <form.Field
                    name="password"
                    children={(field) => {
                      const isInvalid
                        = field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid} className="-mt-2">
                          <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            type="password"
                            placeholder="******"
                            autoComplete="off"
                            required
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <form.Field
                    name="confirmPassword"
                    children={(field) => {
                      const isInvalid
                        = field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid} className="-mt-2">
                          <FieldLabel htmlFor={field.name}>
                            Confirm Password
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={e => field.handleChange(e.target.value)}
                            type="password"
                            placeholder="******"
                            autoComplete="off"
                            required
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />
                  <Field>
                    <Button type="submit" disabled={isSubmitting}>
                      <LoadingSwap isLoading={isSubmitting}>
                        Reset Password
                      </LoadingSwap>
                    </Button>
                  </Field>
                </>
              )}
        </FieldGroup>
      </form>
    </div>
  );
}

// Loading fallback component
function ResetPasswordFormLoading() {
  return (
    <div className="flex flex-col gap-6">
      <form id="promed-signUp-form">
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
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground mt-4">Loading...</p>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}

// Main export with Suspense boundary
export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Suspense fallback={<ResetPasswordFormLoading />}>
      <ResetPasswordFormContent className={className} {...props} />
    </Suspense>
  );
}

// "use client";

// import { useForm } from "@tanstack/react-form";
// import Link from "next/link";
// import { useRouter, useSearchParams } from "next/navigation";
// import * as React from "react";
// import { toast } from "sonner";
// import * as z from "zod";

// import { authClient } from "@/lib/auth/auth-client";
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

// const resetPasswordFormSchema = z
//   .object({
//     password: z.string().min(6, "Invalid password"),
//     confirmPassword: z.string().min(6, "Invalid password"),
//   })
//   .refine(data => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"],
//   });

// export function ResetPasswordForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const router = useRouter();

//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const error = searchParams.get("error");

//   const form = useForm({
//     defaultValues: {
//       password: "",
//       confirmPassword: "",
//     },
//     validators: {
//       onChange: resetPasswordFormSchema,
//     },
//     onSubmit: async ({ value }) => {
//       if (!token)
//         return;

//       await authClient.resetPassword(
//         { newPassword: value.password, token },
//         {
//           onError: (error) => {
//             toast.error(error.error.message || "Failed to reset password");
//           },
//           onSuccess: () => {
//             toast.success("Password reset successful", {
//               description: "Redirecting to login...",
//             });
//             setTimeout(() => {
//               router.push("/login");
//             }, 2000);
//           },
//         },
//       );
//     },
//   });

//   const { isSubmitting } = form.state;

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <form
//         id="promed-signUp-form"
//         onSubmit={(e) => {
//           e.preventDefault();
//           form.handleSubmit();
//         }}
//       >
//         <FieldGroup>
//           <div className="flex flex-col items-center gap-2 text-center">
//             <Link
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
//             </Link>
//             <h1 className="text-xl font-bold">Reset Password</h1>
//           </div>

//           {token == null || error != null
//             ? (
//                 <>
//                   <FieldDescription>
//                     Invalid or expired token. Please request a new password reset.
//                   </FieldDescription>
//                   <Field>
//                     <Button asChild className="w-full">
//                       <Link href="/login">Return to login</Link>
//                     </Button>
//                   </Field>
//                 </>
//               )
//             : (
//                 <>
//                   <FieldDescription>
//                     Enter your new password below to reset your password.
//                   </FieldDescription>

//                   <form.Field
//                     name="password"
//                     children={(field) => {
//                       const isInvalid
//                         = field.state.meta.isTouched && !field.state.meta.isValid;

//                       return (
//                         <Field data-invalid={isInvalid} className="-mt-2">
//                           <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                           <Input
//                             id={field.name}
//                             name={field.name}
//                             value={field.state.value}
//                             onBlur={field.handleBlur}
//                             onChange={e => field.handleChange(e.target.value)}
//                             type="password"
//                             placeholder="******"
//                             autoComplete="off"
//                             required
//                           />
//                           {isInvalid && (
//                             <FieldError errors={field.state.meta.errors} />
//                           )}
//                         </Field>
//                       );
//                     }}
//                   />

//                   <form.Field
//                     name="confirmPassword"
//                     children={(field) => {
//                       const isInvalid
//                         = field.state.meta.isTouched && !field.state.meta.isValid;

//                       return (
//                         <Field data-invalid={isInvalid} className="-mt-2">
//                           <FieldLabel htmlFor={field.name}>
//                             Confirm Password
//                           </FieldLabel>
//                           <Input
//                             id={field.name}
//                             name={field.name}
//                             value={field.state.value}
//                             onBlur={field.handleBlur}
//                             onChange={e => field.handleChange(e.target.value)}
//                             type="password"
//                             placeholder="******"
//                             autoComplete="off"
//                             required
//                           />
//                           {isInvalid && (
//                             <FieldError errors={field.state.meta.errors} />
//                           )}
//                         </Field>
//                       );
//                     }}
//                   />
//                   <Field>
//                     <Button type="submit" disabled={isSubmitting}>
//                       <LoadingSwap isLoading={isSubmitting}>
//                         Reset Password
//                       </LoadingSwap>
//                     </Button>
//                   </Field>
//                 </>
//               )}
//         </FieldGroup>
//       </form>
//     </div>
//   );
// }
