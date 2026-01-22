import { app } from "electron";
import { ChildProcess, spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { appConfig, isPackaged } from "/@/constants";

export class NextServerManager {
  private static instance: NextServerManager;
  private nextProcess: ChildProcess | null = null;
  private serverReady: boolean = false;

  private constructor() {}

  static getInstance(): NextServerManager {
    if (!NextServerManager.instance) {
      NextServerManager.instance = new NextServerManager();
    }
    return NextServerManager.instance;
  }

  /**
   * Start the Next.js server
   */
  async startServer(): Promise<void> {
    if (this.nextProcess && !this.nextProcess.killed) {
      console.log("Next.js server is already running");
      return;
    }

    this.serverReady = false;

    if (!isPackaged) {
      console.log(
        "Development mode: Assuming Next.js dev server is already running"
      );
      this.serverReady = true;
      return;
    }

    console.log("Production mode: Starting Next.js standalone server...");

    // Paths for packaged app
    const standalonePath = app.getAppPath();
    const serverPath = path.join(
      standalonePath,
      "dist",
      "web",
      "/apps/web/server.js"
    );

    console.log("Looking for server at:", serverPath);

    if (!existsSync(serverPath)) {
      console.error("Next.js standalone server not found at:", serverPath);
      throw new Error("Next.js standalone server not found");
    }

    // Environment variables for Next.js process
    const env: NodeJS.ProcessEnv = {
      ...process.env,
      PORT: "3000",
      HOSTNAME: "localhost",
      ELECTRON: "true",
    };

    return new Promise((resolve, reject) => {
      try {
        this.nextProcess = spawn("node", [serverPath], {
          env,
          cwd: standalonePath,
          stdio: ["pipe"],
          detached: false,
        });

        let stdoutBuffer = "";
        let stderrBuffer = "";

        // Handle stdout
        this.nextProcess.stdout?.on("data", (data: Buffer) => {
          const output = data.toString();
          stdoutBuffer += output;
          console.log(`Next.js: ${output.trim()}`);

          if (
            output.includes("started server") ||
            output.includes("Ready in")
          ) {
            this.serverReady = true;
            console.log("Next.js server is ready!");
            resolve();
          }
        });

        // Handle stderr
        this.nextProcess.stderr?.on("data", (data: Buffer) => {
          const error = data.toString();
          stderrBuffer += error;
          console.error(`Next.js error: ${error.trim()}`);
        });

        // Handle process exit
        this.nextProcess.on("close", (code: number | null) => {
          console.log(`Next.js process exited with code ${code}`);
          this.serverReady = false;
          this.nextProcess = null;

          if (code !== 0 && code !== null) {
            const error = new Error(
              `Next.js server failed to start. Code: ${code}\n` +
                `Stdout: ${stdoutBuffer}\n` +
                `Stderr: ${stderrBuffer}`
            );
            reject(error);
          }
        });

        // Handle process error
        this.nextProcess.on("error", (error: Error) => {
          console.error("Failed to start Next.js process:", error);
          this.serverReady = false;
          this.nextProcess = null;
          reject(error);
        });

        // Set timeout for server startup
        setTimeout(() => {
          if (!this.serverReady) {
            const error = new Error(
              "Next.js server startup timeout. Server logs:\n" +
                `Stdout: ${stdoutBuffer}\n` +
                `Stderr: ${stderrBuffer}`
            );
            this.stopServer();
            reject(error);
          }
        }, 30000); // 15 second timeout
      } catch (error) {
        console.error("Error starting Next.js server:", error);
        reject(error);
      }
    });
  }

  /** Stop the Next.js server */
  stopServer(): void {
    if (this.nextProcess && !this.nextProcess.killed) {
      console.log("Stopping Next.js server...");
      this.nextProcess.kill("SIGTERM");
      this.nextProcess = null;
      this.serverReady = false;
    }
  }

  /** Check if server is ready */
  isServerReady(): boolean {
    return this.serverReady;
  }

  /** Get the server URL */
  getServerUrl(): string {
    return appConfig.webBaseURL;
  }

  /** Wait for server to be ready with retries */
  async waitForServerReady(
    maxRetries: number = 30,
    interval: number = 1000
  ): Promise<boolean> {
    for (let i = 0; i < maxRetries; i++) {
      if (this.serverReady) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    return false;
  }
}
