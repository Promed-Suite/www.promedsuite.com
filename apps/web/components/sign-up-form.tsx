"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Spinner } from "@workspace/ui/components/spinner";
import { cn } from "@workspace/ui/lib/utils";

const signUpFormSchema = z.object({
  fullName: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .refine(val => val.split(" ").length > 1, {
      message: "Full name is required",
    }),
  email: z.string().email(),
  password: z.string().min(6, "Invalid password"),
  confirmPassword: z.string().min(6, "Invalid password"),
});

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: signUpFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);

      if (value.password !== value.confirmPassword)
        return;

      await authClient.signUp.email(
        {
          name: value.fullName,
          email: value.email,
          password: value.password,
          callbackURL: "http://localhost:3000/",
        },
        {
          onSuccess: () => {
            router.push(`/verify-email?email=${value.email}`);
          },
          onError: (error) => {
            setIsLoading(false);
            toast.error(error.error.message || "Failed to sign in");
          },
        },
      );
    },
  });

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
                {/* <Icons.logo className="size-6" /> */}
              </div>
              <span className="sr-only">Promed Suite</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Promed Suite</h1>
          </div>
          <form.Field
            name="fullName"
            children={(field) => {
              const isInvalid
                = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    placeholder="m@domain.com"
                    autoComplete="off"
                    required
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

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
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <FieldDescription className="text-center">
            Already have an account?
            {" "}
            <Link href="/login">Login</Link>
          </FieldDescription>
          <Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              Sign Up
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our
        {" "}
        <Link href="#">Terms of Service</Link>
        {" "}
        and
        {" "}
        <Link href="#">Privacy Policy</Link>
        .
      </FieldDescription>
    </div>
  );
}
