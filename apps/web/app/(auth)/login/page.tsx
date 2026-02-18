// import Image from "next/image";
// import { redirect } from "next/navigation";

// import { LoginForm } from "@/components/login-form";
// import { getSession } from "@/lib/auth/auth";
// import { Icons } from "@workspace/ui/components/icons";

// export default async function LoginPage() {
//   const { data: session } = await getSession();

//   if (session?.session) {
//     redirect("/");
//   }

//   return (
//     <div className="grid min-h-svh lg:grid-cols-2">
//       {/* Left - Illustration */}
//       <div className="relative hidden bg-muted lg:block">
//         <Image
//           src="/img/3303484.jpg"
//           width="1000"
//           height="900"
//           alt="Image"
//           className="absolute z-10 inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//         />
//         <div className="absolute z-30 flex flex-col gap-3 text-white left-20 top-1/5 backdrop-blur-[0.5px] pointer-events-none">
//           <div className="size-5 bg-white rounded-full" />
//           <h3 className="font-medium text-3xl">
//             Welcome back
//           </h3>
//           <p className="text-lg text-white/80 max-w-sm">We've kept everything ready for you, making it easy to access the care and benefits you need.</p>
//         </div>
//       </div>

//       {/* Right - Login Form */}
//       <div className="flex flex-col gap-4 p-6 md:p-10">
//         <div className="flex justify-center gap-2 md:justify-end">
//           <a href="#" className="flex items-center gap-2 font-medium">
//             <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/3 text-primary-foreground">
//               <Icons.logo className="size-4" />
//             </div>
//             Promed Suite
//           </a>
//         </div>
//         <div className="flex flex-1 items-center justify-center">
//           <div className="w-full">
//             <LoginForm />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/login/page.tsx
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/auth";

import { AnimatedLeftPanel } from "./_components/animated-left-panel";
import { AnimatedRightPanel } from "./_components/animated-right-panel";

export default async function LoginPage() {
  const { data: session } = await getSession();

  if (session?.session) {
    redirect("/");
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <AnimatedLeftPanel />
      <AnimatedRightPanel />
    </div>
  );
}
