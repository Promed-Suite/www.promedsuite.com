// "use client";

// import { useForm } from "@tanstack/react-form";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
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
// import { Spinner } from "@workspace/ui/components/spinner";
// import { cn } from "@workspace/ui/lib/utils";

// const loginFormSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6, "Invalid password"),
// });

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [isLoading, setIsLoading] = React.useState(false);

//   const router = useRouter();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//     validators: {
//       onChange: loginFormSchema,
//     },
//     onSubmit: async ({ value }) => {
//       setIsLoading(true);
//       await authClient.signIn.email(value, {
//         onSuccess: () => {
//           router.push("/");
//         },
//         onError: (error) => {
//           setIsLoading(false);
//           toast.error(error.error.message || "Failed to sign in");
//         },
//       });
//     },
//   });

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <form
//         id="promed-login-form"
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
//             <h1 className="text-xl font-bold">Welcome to Promed Suite</h1>
//           </div>
//           <form.Field
//             name="email"
//             children={(field) => {
//               const isInvalid
//                 = field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid}>
//                   <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={e => field.handleChange(e.target.value)}
//                     placeholder="m@domain.com"
//                     autoComplete="off"
//                     required
//                   />
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           />

//           <form.Field
//             name="password"
//             children={(field) => {
//               const isInvalid
//                 = field.state.meta.isTouched && !field.state.meta.isValid;

//               return (
//                 <Field data-invalid={isInvalid} className="-mt-2">
//                   <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                   <Input
//                     id={field.name}
//                     name={field.name}
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={e => field.handleChange(e.target.value)}
//                     type="password"
//                     placeholder="******"
//                     autoComplete="off"
//                     required
//                   />
//                   {isInvalid && <FieldError errors={field.state.meta.errors} />}
//                 </Field>
//               );
//             }}
//           />
//           <FieldDescription>
//             Forgot your password?
//             {" "}
//             <Link href="/forgot-password">Reset password</Link>
//           </FieldDescription>
//           <Field>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading && <Spinner />}
//               Login
//             </Button>
//           </Field>
//           <FieldDescription className="text-center">
//             Don&apos;t have an account?
//             {" "}
//             <Link href="/sign-up">Sign up</Link>
//           </FieldDescription>
//         </FieldGroup>
//       </form>
//       {/* <FieldDescription className="px-6 text-center">
//         By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
//         and <a href="#">Privacy Policy</a>.
//       </FieldDescription> */}
//     </div>
//   );
// }

// "use client";

// import { Facebook, Linkedin, Lock, Mail, Twitter } from "lucide-react";
// // import React from "react"
// import { useState } from "react";

// import { Icons } from "@workspace/ui/components/icons";

// export function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ email, password, rememberMe });
//   };

//   return (
//     <div className="min-h-screen overflow-hidden w-full flex flex-col justify-center">
//       {/* Accent parallelogram */}
//       {/* <div className="absolute top-28 -left-12 w-48 h-48 bg-[#b3ff1f] transform -skew-x-12 z-0" /> */}

//       <div className="relative z-10 flex h-full">
//         {/* Left Panel - Login Form */}
//         <div className="w-full md:w-3/5 bg-white/10 backdrop-blur-xl flex flex-col justify-center px-12 md:px-16 py-10 my-10">
//           <div className="">
//             {/* Form */}
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Email Field */}
//               <div className="space-y-2">
//                 <label className="block text-white text-sm font-medium">Email</label>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-[#b3ff1f] pb-2 transition-colors"
//                   placeholder=""
//                   required
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="space-y-2">
//                 <label className="block text-white text-sm font-medium">Password</label>
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   className="w-full bg-transparent border-b-2 border-white text-white placeholder-gray-300 focus:outline-none focus:border-[#b3ff1f] pb-2 transition-colors"
//                   placeholder=""
//                   required
//                 />
//               </div>

//               {/* Remember Me & Login Button */}
//               <div className="flex items-center justify-between pt-4">
//                 <label className="flex items-center gap-2 text-white cursor-pointer text-sm">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={e => setRememberMe(e.target.checked)}
//                     className="w-4 h-4 rounded border-gray-300 accent-[#b3ff1f]"
//                   />
//                   <span>Remember Me?</span>
//                 </label>
//                 <button
//                   type="submit"
//                   className="bg-white text-[#003d7a] px-8 py-2 rounded font-bold hover:bg-gray-100 transition-colors"
//                 >
//                   LOGIN
//                 </button>
//               </div>
//             </form>

//             {/* Footer Logo */}
//             <div className="mt-16 pt-8 border-t border-gray-500">
//               <div className="text-white text-xs space-y-1">
//                 <div className="flex items-center gap-2 font-bold">
//                   <div className="w-4 h-4 bg-white rounded-full" />
//                   PROMEDSUITE
//                 </div>
//                 <p className="text-gray-300">Developed by the PromedSolutions Partners, LLC</p>
//                 <p className="text-gray-300">www.promedsolutions.com</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Info Card */}
//         <div className="hidden md:flex w-2/5 justify-center items-center">
//           <div className="bg-white rounded-lg shadow-2xl p-8 w-full h-full text-center relative flex flex-col justify-center">
//             {/* Logo - placeholder circle with gradient concept */}
//             <div className="mb-6 flex justify-center">
//               <div className="w-20 h-20 rounded-full border flex items-center justify-center text-white font-bold text-2xl">
//                 {/* PS */}
//                 <Icons.logo />
//               </div>
//             </div>

//             {/* Company Name */}
//             <h1 className="text-2xl font-bold text-[#003d7a] mb-8">PromedSuite</h1>

//             {/* Website */}
//             <p className="text-gray-600 text-sm mb-6">www.promedsuite.com</p>

//             {/* Help & Support */}
//             <p className="text-gray-800 font-semibold text-sm mb-4">Help & Support</p>

//             {/* Social Icons */}
//             <div className="flex justify-center gap-4">
//               <a
//                 href="#"
//                 className="text-[#003d7a] hover:text-[#5cc9f1] transition-colors"
//                 aria-label="LinkedIn"
//               >
//                 <Linkedin size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="text-[#003d7a] hover:text-[#5cc9f1] transition-colors"
//                 aria-label="Twitter"
//               >
//                 <Twitter size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="text-[#003d7a] hover:text-[#5cc9f1] transition-colors"
//                 aria-label="Facebook"
//               >
//                 <Facebook size={20} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useForm } from "@tanstack/react-form";
// import { Facebook, Linkedin, Twitter } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import * as z from "zod";

// import { authClient } from "@/lib/auth/auth-client";
// import { Icons } from "@workspace/ui/components/icons";

// const loginFormSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6, "Invalid password"),
//   rememberMe: z.boolean(),
// });

// export function LoginForm() {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//       rememberMe: false,
//     },
//     validators: {
//       onChange: loginFormSchema,
//     },
//     onSubmit: async ({ value }) => {
//       setIsLoading(true);
//       try {
//         await authClient.signIn.email(
//           {
//             email: value.email,
//             password: value.password,
//           },
//           {
//             onSuccess: () => {
//               router.push("/");
//             },
//             onError: (error) => {
//               setIsLoading(false);
//               toast.error(error.error.message || "Failed to sign in");
//             },
//           },
//         );
//       }
//       catch (error) {
//         console.error(error);
//         setIsLoading(false);
//         toast.error("An unexpected error occurred");
//       }
//     },
//   });

//   return (
//     <div className="min-h-screen overflow-hidden w-full flex flex-col justify-center">
//       <div className="relative z-10 flex h-full">
//         {/* Left Panel - Login Form */}
//         <div className="w-full md:w-3/5 bg-white/10 backdrop-blur-xl flex flex-col justify-center px-12 md:px-16 py-10 my-10">
//           <div className="">
//             {/* Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 form.handleSubmit();
//               }}
//               className="space-y-8"
//             >
//               {/* Email Field */}
//               <form.Field
//                 name="email"
//                 children={(field) => {
//                   const isInvalid
//                     = field.state.meta.isTouched
//                       && field.state.meta.errors.length > 0;

//                   return (
//                     <div className="space-y-2">
//                       <label className="block text-white text-sm font-medium">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         name={field.name}
//                         value={field.state.value}
//                         onBlur={field.handleBlur}
//                         onChange={e => field.handleChange(e.target.value)}
//                         className={`w-full bg-transparent border-b-2 text-white placeholder-gray-300 focus:outline-none pb-2 transition-colors ${
//                           isInvalid
//                             ? "border-red-500"
//                             : "border-white focus:border-[#b3ff1f]"
//                         }`}
//                         placeholder=""
//                         required
//                       />
//                       {isInvalid && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {field.state.meta.errors.join(", ")}
//                         </p>
//                       )}
//                     </div>
//                   );
//                 }}
//               />

//               {/* Password Field */}
//               <form.Field
//                 name="password"
//                 children={(field) => {
//                   const isInvalid
//                     = field.state.meta.isTouched
//                       && field.state.meta.errors.length > 0;

//                   return (
//                     <div className="space-y-2">
//                       <label className="block text-white text-sm font-medium">
//                         Password
//                       </label>
//                       <input
//                         type="password"
//                         name={field.name}
//                         value={field.state.value}
//                         onBlur={field.handleBlur}
//                         onChange={e => field.handleChange(e.target.value)}
//                         className={`w-full bg-transparent border-b-2 text-white placeholder-gray-300 focus:outline-none pb-2 transition-colors ${
//                           isInvalid
//                             ? "border-red-500"
//                             : "border-white focus:border-[#b3ff1f]"
//                         }`}
//                         placeholder=""
//                         required
//                       />
//                       {isInvalid && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {field.state.meta.errors.join(", ")}
//                         </p>
//                       )}
//                     </div>
//                   );
//                 }}
//               />

//               {/* Remember Me & Login Button */}
//               <div className="flex items-center justify-between pt-4">
//                 <form.Field
//                   name="rememberMe"
//                   children={field => (
//                     <label className="flex items-center gap-2 text-white cursor-pointer text-sm">
//                       <input
//                         type="checkbox"
//                         checked={field.state.value}
//                         onBlur={field.handleBlur}
//                         onChange={e => field.handleChange(e.target.checked)}
//                         className="w-4 h-4 rounded border-gray-300 accent-[#b3ff1f]"
//                       />
//                       <span>Remember Me?</span>
//                     </label>
//                   )}
//                 />
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className="bg-white text-[#003d7a] px-8 py-2 rounded font-bold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isLoading ? "LOGGING IN..." : "LOGIN"}
//                 </button>
//               </div>
//             </form>

//             {/* Footer Logo */}
//             <div className="mt-16 pt-8 border-t border-gray-400">
//               <div className="text-white text-xs space-y-1">
//                 <div className="flex items-center gap-2 font-bold">
//                   <div className="w-4 h-4 bg-white rounded-full" />
//                   PROMEDSUITE
//                 </div>
//                 <p className="text-gray-300">
//                   Developed by the PromedSolutions Partners, LLC
//                 </p>
//                 <p className="text-gray-300">www.promedsolutions.com</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel - Info Card */}
//         <div className="hidden md:flex w-2/5 justify-center items-center">
//           <div className="bg-white rounded-lg shadow-2xl p-8 w-full h-full text-center relative flex flex-col justify-center">
//             {/* Logo - placeholder circle with gradient concept */}
//             <div className="mb-6 flex justify-center">
//               <div className="w-20 h-20 rounded-full border flex items-center justify-center text-white font-bold text-2xl">
//                 <Icons.logo />
//               </div>
//             </div>

//             {/* Company Name */}
//             <h1 className="text-2xl font-bold text-[#003d7a] mb-8">
//               PromedSuite
//             </h1>

//             {/* Website */}
//             <p className="text-gray-600 text-sm mb-6">www.promedsuite.com</p>

//             {/* Help & Support */}
//             <p className="text-gray-800 font-semibold text-sm mb-4">
//               Help & Support
//             </p>

//             {/* Social Icons */}
//             <div className="flex justify-center gap-4">
//               <a
//                 href="#"
//                 className="text-[#003d7a] hover:text-[#5cc9f1] transition-colors"
//                 aria-label="LinkedIn"
//               >
//                 <Linkedin size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="text-[#003d7a] hover:text-[#5cc9f1] transition-colors"
//                 aria-label="Twitter"
//               >
//                 <Twitter size={20} />
//               </a>
//               <a
//                 href="#"
//                 className="text-[#003d7a] hover:text-[#5cc9f1] transition-colors"
//                 aria-label="Facebook"
//               >
//                 <Facebook size={20} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useForm } from "@tanstack/react-form";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import * as z from "zod";

// import { authClient } from "@/lib/auth/auth-client";
// import { Button } from "@workspace/ui/components/button";
// import { Icons } from "@workspace/ui/components/icons";
// import { Input } from "@workspace/ui/components/input";
// import { cn } from "@workspace/ui/lib/utils";

// type LoginFormProps = {
//   heading?: string;
//   logo: {
//     url: string;
//     src: string;
//     alt: string;
//     title?: string;
//     className?: string;
//   };
//   buttonText?: string;
//   googleText?: string;
//   signupText?: string;
//   signupUrl?: string;
//   className?: string;
// };

// const loginFormSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6, "Invalid password"),
//   rememberMe: z.boolean(),
// });

// export function LoginForm({
//   heading = "Login",
//   logo = {
//     url: "https://www.shadcnblocks.com",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
//     alt: "logo",
//     title: "shadcnblocks.com",
//   },
//   buttonText = "Login",
//   signupText = "Need an account?",
//   signupUrl = "https://shadcnblocks.com",
//   className,
// }: LoginFormProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//       rememberMe: false,
//     },
//     validators: {
//       onChange: loginFormSchema,
//     },
//     onSubmit: async ({ value }) => {
//       setIsLoading(true);
//       try {
//         await authClient.signIn.email(
//           {
//             email: value.email,
//             password: value.password,
//           },
//           {
//             onSuccess: () => {
//               router.push("/");
//             },
//             onError: (error) => {
//               setIsLoading(false);
//               toast.error(error.error.message || "Failed to sign in");
//             },
//           },
//         );
//       }
//       catch (error) {
//         console.error(error);
//         setIsLoading(false);
//         toast.error("An unexpected error occurred");
//       }
//     },
//   });

//   return (
//     <section className={cn("h-screen bg-muted", className)}>
//       <div className="flex h-full items-center justify-center">
//         {/* Logo */}
//         <div className="flex flex-col items-center gap-6 lg:justify-start">
//           <a href={logo.url}>
//             <Icons.logo className="size-8" />
//           </a>
//           <div className="flex w-full max-w-sm min-w-sm flex-col items-start gap-y-4 rounded-xl border border-muted bg-background px-6 py-8 shadow-md">
//             {/* {heading && <h1 className="text-xl font-semibold mr-auto">{heading}</h1>} */}
//             <div className="flex flex-col items-start gap-y-2">
//               <h1 className="text-xl font-semibold">
//                 {heading}
//               </h1>
//               <div className="text-sm">
//                 <span className="text-muted-foreground">
//                   {signupText}
//                   {" "}
//                 </span>
//                 <a href={signupUrl} className="font-medium text-primary hover:underline">Sign up</a>
//               </div>
//             </div>
//             <Input
//               type="email"
//               placeholder="Email"
//               className="text-sm rounded-lg"
//               required
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               className="text-sm rounded-lg"
//               required
//             />
//             <Button type="submit" className="w-full rounded-lg">
//               {buttonText}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// "use client";

// import { useForm } from "@tanstack/react-form";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import * as z from "zod";

// import { authClient } from "@/lib/auth/auth-client";
// import { Button } from "@workspace/ui/components/button";
// import { Icons } from "@workspace/ui/components/icons";
// import { Input } from "@workspace/ui/components/input";
// import { Spinner } from "@workspace/ui/components/spinner";
// import { cn } from "@workspace/ui/lib/utils";

// type LoginFormProps = {
//   heading?: string;
//   logo: {
//     url: string;
//     src: string;
//     alt: string;
//     title?: string;
//     className?: string;
//   };
//   buttonText?: string;
//   googleText?: string;
//   signupText?: string;
//   signupUrl?: string;
//   className?: string;
// };

// const loginFormSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(1, "Password is required"),
// });

// type LoginFormValues = z.infer<typeof loginFormSchema>;

// export function LoginForm({
//   heading = "Login",
//   logo = {
//     url: "https://www.shadcnblocks.com",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
//     alt: "logo",
//     title: "shadcnblocks.com",
//   },
//   buttonText = "Login",
//   signupText = "Need an account?",
//   signupUrl = "https://shadcnblocks.com",
//   className,
// }: LoginFormProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const form = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     } as LoginFormValues,
//     validators: {
//       onChange: loginFormSchema,
//       onSubmit: loginFormSchema,
//     },
//     onSubmit: async ({ value }) => {
//       setIsLoading(true);

//       try {
//         const { error } = await authClient.signIn.email(
//           {
//             email: value.email,
//             password: value.password,
//           },
//           {
//             onRequest: () => {
//               toast.loading("Signing in...", { id: "login-toast" });
//             },
//             onSuccess: () => {
//               toast.success("Successfully signed in!", { id: "login-toast" });
//               router.push("/");
//               router.refresh();
//             },
//             onError: (context) => {
//               toast.error(context.error.message || "Failed to sign in", {
//                 id: "login-toast",
//               });
//               setIsLoading(false);
//             },
//           },
//         );

//         if (error) {
//           throw error;
//         }
//       }
//       catch (error) {
//         console.error("Login error:", error);
//         toast.error("An unexpected error occurred", { id: "login-toast" });
//         setIsLoading(false);
//       }
//     },
//   });

//   return (
//     <section className={cn("h-screen bg-muted", className)}>
//       <div className="flex h-full items-center justify-center">
//         {/* Logo and Form Container */}
//         <div className="flex flex-col items-center gap-6 lg:justify-start">
//           <a href={logo.url}>
//             <Icons.logo className="size-8" />
//           </a>

//           {/* Form Card */}
//           <div className="flex w-full max-w-sm min-w-sm flex-col items-start gap-y-4 rounded-xl border border-muted bg-background px-6 py-8 shadow-md">
//             {/* Header */}
//             <div className="flex flex-col items-start gap-y-2">
//               <h1 className="text-xl font-semibold">
//                 {heading}
//               </h1>
//               <div className="text-sm">
//                 <span className="text-muted-foreground">
//                   {signupText}
//                   {" "}
//                 </span>
//                 <a
//                   href={signupUrl}
//                   className="font-medium text-primary hover:underline"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     router.push(signupUrl);
//                   }}
//                 >
//                   Sign up
//                 </a>
//               </div>
//             </div>

//             {/* Form */}
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 form.handleSubmit();
//               }}
//               className="w-full space-y-4"
//             >
//               {/* Email Field */}
//               <form.Field
//                 name="email"
//                 children={(field) => {
//                   const isInvalid = field.state.meta.isTouched
//                     && field.state.meta.errors.length > 0;
//                   const errorMessage = field.state.meta.errors.reduce((acc, nextVal) => `${acc + nextVal?.message}. `, "");

//                   return (
//                     <div className="space-y-1">
//                       <Input
//                         id="email"
//                         type="email"
//                         name={field.name}
//                         value={field.state.value}
//                         onBlur={field.handleBlur}
//                         onChange={e => field.handleChange(e.target.value)}
//                         disabled={isLoading}
//                         placeholder="Email"
//                         className={cn(
//                           "text-sm rounded-lg",
//                           isInvalid && "border-destructive focus-visible:ring-destructive",
//                         )}
//                         aria-invalid={isInvalid}
//                         aria-describedby={isInvalid ? "email-error" : undefined}
//                         required
//                       />
//                       {isInvalid && (
//                         <p
//                           id="email-error"
//                           className="text-xs text-destructive"
//                         >
//                           {errorMessage}
//                         </p>
//                       )}
//                     </div>
//                   );
//                 }}
//               />

//               {/* Password Field */}
//               <form.Field
//                 name="password"
//                 children={(field) => {
//                   const isInvalid = field.state.meta.isTouched
//                     && field.state.meta.errors.length > 0;
//                   const errorMessage = field.state.meta.errors.reduce((acc, nextVal) => `${acc + nextVal?.message}. `, "");

//                   return (
//                     <div className="space-y-1">
//                       <Input
//                         id="password"
//                         type="password"
//                         name={field.name}
//                         value={field.state.value}
//                         onBlur={field.handleBlur}
//                         onChange={e => field.handleChange(e.target.value)}
//                         disabled={isLoading}
//                         placeholder="Password"
//                         className={cn(
//                           "text-sm rounded-lg",
//                           isInvalid && "border-destructive focus-visible:ring-destructive",
//                         )}
//                         aria-invalid={isInvalid}
//                         aria-describedby={isInvalid ? "password-error" : undefined}
//                         required
//                       />
//                       {isInvalid && (
//                         <p
//                           id="password-error"
//                           className="text-xs text-destructive"
//                         >
//                           {errorMessage}
//                         </p>
//                       )}

//                       {/* Forgot Password Link */}
//                       {/* <div className="flex justify-end mt-1">
//                         <button
//                           type="button"
//                           onClick={() => router.push("/forgot-password")}
//                           className="text-xs text-muted-foreground hover:text-primary
//                             transition-colors focus:outline-none focus:underline"
//                         >
//                           Forgot password?
//                         </button>
//                       </div> */}
//                     </div>
//                   );
//                 }}
//               />

//               {/* Remember Me Checkbox */}
//               {/* <form.Field
//                 name="rememberMe"
//                 children={field => (
//                   <label className="flex items-center gap-2 text-sm cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={field.state.value}
//                       onBlur={field.handleBlur}
//                       onChange={e => field.handleChange(e.target.checked)}
//                       disabled={isLoading}
//                       className="size-4 rounded border-gray-300 text-primary
//                         focus:ring-primary disabled:opacity-50"
//                     />
//                     <span className="text-muted-foreground">Remember me</span>
//                   </label>
//                 )}
//               /> */}

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 className="w-full rounded-lg cursor-pointer"
//                 disabled={isLoading}
//               >
//                 {isLoading
//                   ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <Spinner className="size-4" />
//                         LOGGING IN...
//                       </span>
//                     )
//                   : (
//                       buttonText
//                     )}
//               </Button>

//               <div className="relative w-full">
//                 <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted-foreground/20"></span></div>
//                 <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-muted-foreground">OR</span></div>
//               </div>

//               <Button className="w-full rounded-lg cursor-pointer" variant="secondary" type="submit">
//                 Use Passkey
//               </Button>
//             </form>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";

import { authClient } from "@/lib/auth/auth-client";
import { Button } from "@workspace/ui/components/button";
import { Icons } from "@workspace/ui/components/icons";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Spinner } from "@workspace/ui/components/spinner";
import { cn } from "@workspace/ui/lib/utils";

const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginFormValues,
    validators: {
      onChange: loginFormSchema,
      onSubmit: loginFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);

      try {
        const { error } = await authClient.signIn.email(
          {
            email: value.email,
            password: value.password,
          },
          {
            onSuccess: () => {
              toast.success("Successfully signed in!", { id: "login-toast" });
              router.push("/");
              router.refresh();
            },
            onError: (context) => {
              toast.error(context.error.message || "Failed to sign in", {
                id: "login-toast",
              });
              setIsLoading(false);
            },
          },
        );

        if (error) {
          throw error;
        }
      }
      catch (error) {
        console.error("Login error:", error);
        toast.error("An unexpected error occurred", { id: "login-toast" });
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-start gap-2 text-center">
        <h1 className="text-2xl font-medium">Sign in</h1>
        {/* <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p> */}
      </div>
      <div className="grid gap-6">
        <Button
          variant="outline"
          className="w-full rounded-3xl cursor-pointer"
          size="lg"
          onClick={() => toast.info("No passkeys found.", {
            description: "Set up your first passkey for faster, more secure sign-in.",
          })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-key-icon lucide-user-round-key">
            <path d="M19 11v6" />
            <path d="M19 13h2" />
            <path d="M2 21a8 8 0 0 1 12.868-6.349" />
            <circle cx="10" cy="8" r="5" />
            <circle cx="19" cy="19" r="2" />
          </svg>
          Login with Passkey
        </Button>
        <Button variant="outline" className="w-full rounded-3xl cursor-pointer" size="lg">
          <Icons.microsoft />
          Login with Microsoft
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="w-full space-y-6"
        >
          {/* Email Field */}
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched
                && field.state.meta.errors.length > 0;
              const errorMessage = field.state.meta.errors.reduce((acc, nextVal) => `${acc + nextVal?.message}. `, "");

              return (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    disabled={isLoading}
                    aria-invalid={isInvalid}
                    aria-describedby={isInvalid ? "email-error" : undefined}
                    className={cn(
                      "rounded-xl px-4",
                      isInvalid && "border-destructive focus-visible:ring-destructive",
                    )}
                    placeholder="m@example.com"
                    required
                  />
                  {isInvalid && (
                    <p
                      id="email-error"
                      className="text-xs text-destructive"
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>
              );
            }}
          />

          {/* Password Field */}
          <form.Field
            name="password"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched
                && field.state.meta.errors.length > 0;
              const errorMessage = field.state.meta.errors.reduce((acc, nextVal) => `${acc + nextVal?.message}. `, "");

              return (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => field.handleChange(e.target.value)}
                    disabled={isLoading}
                    placeholder="******"
                    className={cn("rounded-xl px-4", isInvalid && "border-destructive focus-visible:ring-destructive")}
                    aria-invalid={isInvalid}
                    aria-describedby={isInvalid ? "password-error" : undefined}
                    required
                  />
                  {isInvalid && (
                    <p
                      id="password-error"
                      className="text-xs text-destructive"
                    >
                      {errorMessage}
                    </p>
                  )}
                </div>
              );
            }}
          />
          <Button type="submit" className="w-full rounded-3xl cursor-pointer" size="lg" disabled={isLoading}>
            {isLoading
              ? (
                  <span className="flex items-center justify-center gap-2">
                    <Spinner className="size-4" />
                    LOGGING IN...
                  </span>
                )
              : (
                  "Login"
                )}
          </Button>
        </form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?
        {" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </div>
  );
}
