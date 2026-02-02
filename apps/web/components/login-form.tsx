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

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Invalid password"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      await authClient.signIn.email(value, {
        onSuccess: () => {
          router.push("/");
        },
        onError: (error) => {
          setIsLoading(false);
          toast.error(error.error.message || "Failed to sign in");
        },
      });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        id="promed-login-form"
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
          <FieldDescription>
            Forgot your password?
            {" "}
            <Link href="/forgot-password">Reset password</Link>
          </FieldDescription>
          <Field>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Spinner />}
              Login
            </Button>
          </Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?
            {" "}
            <Link href="/sign-up">Sign up</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
