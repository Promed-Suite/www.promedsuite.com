#!/usr/bin/env node

// import type { ChildProcess } from "node:child_process";
// import { spawn } from "node:child_process";
// import path from "node:path";
// import type { LogLevel, ViteDevServer } from "vite";
// import { build, createServer } from "vite";
// import electronPath from "../apps/electron/node_modules/electron/";

// /** @type 'production' | 'development'' */
// const mode = (process.env.MODE = process.env.MODE || "development");

// const logLevel: LogLevel = "warn";

// const argv = process.argv.slice(2);
// // 解析命令行参数
// const args = argv.reduce(
//   (acc, arg) => {
//     const [key, value] = arg.split("=");
//     acc[key] = value;
//     return acc;
//   },
//   {} as Record<string, string>
// );

// /**
//  * 设置`main`包的监听器
//  * 当文件发生变化时，完全重新启动electron应用程序。
//  * @param {import('vite').ViteDevServer} watchServer 渲染器监听服务器实例。
//  * 需要从{@link import('vite').ViteDevServer.resolvedUrls}设置`VITE_DEV_SERVER_URL`环境变量。
//  */
// function setupMainPackageWatcher({ resolvedUrls }: ViteDevServer) {
//   process.env.VITE_DEV_SERVER_URL = resolvedUrls?.local[0];

//   let electronApp: ChildProcess | null = null;

//   return build({
//     mode,
//     logLevel,
//     configFile: "apps/electron/vite.config.ts",
//     build: {
//       /**
//        * 设置为{}以启用rollup监听器
//        * @see https://vitejs.dev/config/build-options.html#build-watch
//        */
//       watch: Reflect.has(args, "--watch") ? {} : null,
//     },
//     plugins: [
//       {
//         name: "reload-app-on-main-package-change",
//         writeBundle() {
//           /** 如果进程已存在，则杀死electron */
//           if (electronApp !== null) {
//             electronApp.removeListener("exit", process.exit);
//             electronApp.kill("SIGINT");
//             electronApp = null;
//           }

//           console.log("Reloading electron app...", String(electronPath));
//           /** 启动新的electron进程 */
//           electronApp = spawn(
//             String(electronPath),
//             ["--inspect", ".", "--experimental-network-inspection"],
//             {
//               // 设置工作目录
//               cwd: path.resolve(import.meta.dirname, "../apps/electron"),
//             }
//           );

//           electronApp.stdout?.on("data", (data) => {
//             console.log(data.toString());
//           });

//           electronApp.stderr?.on("data", (data) => {
//             const str = data.toString();
//             const ignoreErrors = [
//               "Secure coding is not enabled for restorable state",
//               "CoreText note: Client requested name",
//             ];
//             if (ignoreErrors.some((err) => str.includes(err))) {
//               return;
//             }
//             console.log("\x1B[31m%s\x1B[0m", str);
//           });

//           /** 当应用程序退出时停止监听脚本 */
//           electronApp.addListener("exit", process.exit);
//         },
//       },
//     ],
//   });
// }

// /**
//  * 设置`preload`包的监听器
//  * 当文件发生变化时，重新加载网页。
//  * @param {import('vite').ViteDevServer} watchServer 渲染器监听服务器实例。
//  * 需要访问页面的web socket。通过向socket发送`full-reload`命令，重新加载网页。
//  */
// function setupPreloadPackageWatcher({ ws }: ViteDevServer) {
//   return build({
//     mode,
//     logLevel,
//     configFile: "apps/preload/vite.config.ts",
//     build: {
//       /**
//        * 设置为{}以启用rollup监听器
//        * @see https://vitejs.dev/config/build-options.html#build-watch
//        */
//       watch: {},
//     },
//     plugins: [
//       {
//         name: "reload-page-on-preload-package-change",
//         writeBundle() {
//           ws.send({
//             type: "full-reload",
//           });
//         },
//       },
//     ],
//   });
// }

// /**
//  * 渲染器包的开发服务器 必须是第一个启动，
//  * 因为{@link setupMainPackageWatcher}和{@link setupPreloadPackageWatcher}
//  * 依赖于开发服务器的属性
//  */
// (async () => {
//   const rendererWatchServer = await createServer({
//     mode,
//     logLevel,
//     configFile: "apps/web/vite.config.ts",
//   }).then((s) => s.listen());

//   await setupPreloadPackageWatcher(rendererWatchServer);
//   await setupMainPackageWatcher(rendererWatchServer);
// })();

import type { ChildProcess } from "node:child_process";
import { spawn } from "node:child_process";
import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type 'production' | 'development'' */
const mode = (process.env.MODE = process.env.MODE || "development");

const argv = process.argv.slice(2);
// Parse command line arguments
const args = argv.reduce(
  (acc, arg) => {
    const [key, value] = arg.split("=");
    acc[key] = value;
    return acc;
  },
  {} as Record<string, string>
);

// Next.js development server port
const NEXT_DEV_PORT = 3000;

/**
 * Start Next.js development server
 */
function startNextDevServer(): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    console.log("Starting Next.js development server...");

    const nextProcess = spawn("pnpm", ["dev:next"], {
      cwd: path.resolve(__dirname, ".."),
      stdio: "pipe",
      shell: true,
      env: {
        ...process.env,
        PORT: NEXT_DEV_PORT.toString(),
        ELECTRON: "true",
      },
    });

    // Buffer for stdout
    let outputBuffer = "";

    nextProcess.stdout?.on("data", (data) => {
      const output = data.toString();
      outputBuffer += output;
      console.log(`Next.js: ${output.trim()}`);

      // Check if server is ready
      if (
        output.includes(`localhost:${NEXT_DEV_PORT}`) ||
        output.includes("Ready in") ||
        output.includes("started server")
      ) {
        console.log("Next.js development server is ready!");
        resolve(nextProcess);
      }
    });

    nextProcess.stderr?.on("data", (data) => {
      console.error(`Next.js error: ${data.toString().trim()}`);
    });

    nextProcess.on("error", (error) => {
      console.error("Failed to start Next.js:", error);
      reject(error);
    });

    // Timeout for server startup
    setTimeout(() => {
      if (!nextProcess.killed) {
        // If we have output but didn't match the ready condition, assume it's ready
        if (outputBuffer.length > 0) {
          console.log("Assuming Next.js server is ready after timeout...");
          resolve(nextProcess);
        } else {
          reject(new Error("Next.js server startup timeout"));
        }
      }
    }, 30000);
  });
}

/**
 * Setup main package watcher
 */
async function setupMainPackageWatcher(
  nextDevServer: ChildProcess | null = null
) {
  // Set the dev server URL for Electron to use
  process.env.VITE_DEV_SERVER_URL = `http://localhost:${NEXT_DEV_PORT}`;

  let electronApp: ChildProcess | null = null;

  // Import electron-builder for building in watch mode
  const { build } = await import("vite");

  return build({
    mode,
    logLevel: "warn",
    configFile: "apps/electron/vite.config.ts",
    build: {
      /**
       * Set to {} to enable rollup watcher
       * @see https://vitejs.dev/config/build-options.html#build-watch
       */
      watch: Reflect.has(args, "--watch") ? {} : null,
      // Set minify to false for faster builds in development
      minify: false,
    },
    plugins: [
      {
        name: "reload-app-on-main-package-change",
        writeBundle() {
          /** Kill existing electron process */
          if (electronApp !== null) {
            electronApp.removeAllListeners();
            electronApp.kill("SIGTERM");
            electronApp = null;
          }

          // Ensure Next.js server is running
          if (nextDevServer?.killed) {
            console.error("Next.js server is not running!");
            return;
          }

          console.log("Starting Electron app...");

          /** Start new electron process */
          electronApp = spawn(
            String(require("../apps/electron/node_modules/electron")),
            [
              "--inspect=5858",
              ".",
              "--disable-http-cache",
              "--enable-logging",
              `--remote-debugging-port=8315`,
            ],
            {
              stdio: "pipe",
              cwd: path.resolve(__dirname, "../apps/electron"),
              env: {
                ...process.env,
                ELECTRON_IS_DEV: "1",
                NODE_ENV: "development",
                NEXT_PUBLIC_APP_ENV: "development",
              },
            }
          );

          // Handle Electron output
          electronApp.stdout?.on("data", (data) => {
            const str = data.toString().trim();
            if (str) console.log(`Electron: ${str}`);
          });

          // electronApp.stderr?.on("data", (data) => {
          //   const str = data.toString().trim();
          //   if (str) {
          //     // Filter out common harmless warnings
          //     const ignoreWarnings = [
          //       "Secure coding is not enabled for restorable state",
          //       "CoreText note: Client requested name",
          //       "Download the React DevTools",
          //       "DevTools listening on",
          //     ];

          //     if (!ignoreWarnings.some((warning) => str.includes(warning))) {
          //       console.error("\x1B[31m%s\x1B[0m", `Electron Error: ${str}`);
          //     }
          //   }
          // });
          electronApp.stderr?.on("data", (data) => {
            const str = data.toString().trim();
            if (!str) return;

            // Define message categories
            const categories = {
              fastRefresh: /\[Fast Refresh\]/,
              nextCompiling: /○ Compiling|✓ Compiled/,
              infoConsole: /INFO:CONSOLE/,
              warningConsole: /WARNING:CONSOLE/,
              errorConsole: /ERROR:CONSOLE/,
              devTools: /DevTools listening on/,
              reactDevTools: /Download the React DevTools/,
              systemWarnings: /Secure coding|CoreText note/,
              nextRequest: /GET|POST|PUT|DELETE \//,
            };

            // Categorize and colorize
            let color = "\x1B[90m"; // Default gray
            let prefix = "[Renderer]";

            if (
              categories.fastRefresh.test(str) ||
              categories.nextCompiling.test(str)
            ) {
              color = "\x1B[36m"; // Cyan for Next.js/HMR
              prefix = "[Next.js]";
            } else if (categories.infoConsole.test(str)) {
              color = "\x1B[36m"; // Cyan for info
              prefix = "[Browser Console]";
            } else if (categories.warningConsole.test(str)) {
              color = "\x1B[33m"; // Yellow for warnings
              prefix = "[Browser Warning]";
            } else if (categories.errorConsole.test(str)) {
              color = "\x1B[31m"; // Red for errors
              prefix = "[Browser Error]";
            } else if (categories.nextRequest.test(str)) {
              color = "\x1B[32m"; // Green for HTTP requests
              prefix = "[Next.js]";
            } else if (categories.systemWarnings.test(str)) {
              return; // Skip system warnings entirely
            }

            console.log(`${color}${prefix} ${str}\x1B[0m`);
          });

          electronApp.on("close", (code) => {
            console.log(`Electron process exited with code ${code}`);
            electronApp = null;

            // Don't exit the whole process on Electron close
            // Allow restarting Electron without killing Next.js
          });

          // Cleanup on script exit
          process.on("SIGINT", () => {
            if (electronApp) {
              electronApp.kill("SIGTERM");
            }
            if (nextDevServer) {
              nextDevServer.kill("SIGTERM");
            }
            process.exit(0);
          });
        },
      },
    ],
  });
}

/**
 * Setup preload package watcher
 */
async function setupPreloadPackageWatcher() {
  const { build } = await import("vite");

  return build({
    mode,
    logLevel: "warn",
    configFile: "apps/preload/vite.config.ts",
    build: {
      /**
       * Set to {} to enable rollup watcher
       * @see https://vitejs.dev/config/build-options.html#build-watch
       */
      watch: {},
      minify: false,
    },
    plugins: [
      {
        name: "notify-electron-reload",
        writeBundle() {
          console.log(
            "Preload script updated - restart Electron to apply changes"
          );
          // In Electron with Next.js, we can't send WebSocket messages
          // User needs to manually restart or we could implement IPC-based reload
        },
      },
    ],
  });
}

/**
 * Main function
 */
async function main() {
  let nextDevServer: ChildProcess | null = null;

  try {
    // Check if we're in development mode
    if (mode === "development") {
      // Start Next.js development server
      nextDevServer = await startNextDevServer();

      // Setup preload package watcher
      await setupPreloadPackageWatcher();

      // Setup main package watcher with Next.js server reference
      await setupMainPackageWatcher(nextDevServer);

      console.log("\n✅ Development environment ready!");
      console.log(`   Next.js: http://localhost:${NEXT_DEV_PORT}`);
      console.log(`   Electron: Starting...`);
      console.log("\n📝 Changes to Next.js files will hot reload");
      console.log("📝 Changes to Electron main files will restart the app");
      console.log("📝 Changes to preload scripts require manual restart");
      console.log("\nPress Ctrl+C to stop all processes");
    } else {
      // Production-like build mode
      console.log("Building for production...");

      // Build Next.js
      console.log("Building Next.js...");
      const nextBuild = spawn("pnpm", ["build:next"], {
        cwd: path.resolve(__dirname, ".."),
        stdio: "inherit",
        shell: true,
      });

      await new Promise((resolve, reject) => {
        nextBuild.on("close", (code) => {
          if (code === 0) resolve(code);
          else reject(new Error(`Next.js build failed with code ${code}`));
        });
      });

      // Build Electron
      console.log("Building Electron...");
      const { build } = await import("vite");

      await build({
        mode: "production",
        configFile: "apps/electron/vite.config.ts",
      });

      console.log("✅ Production build complete!");
    }
  } catch (error) {
    console.error("\n❌ Error:", error);

    // Cleanup processes
    if (nextDevServer && !nextDevServer.killed) {
      nextDevServer.kill("SIGTERM");
    }

    process.exit(1);
  }
}

// Handle process termination
process.on("SIGINT", () => {
  console.log("\nShutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("\nTerminating...");
  process.exit(0);
});

// Run main function
main();
