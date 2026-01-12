/* eslint-disable no-console */
/* eslint-disable node/no-process-env */
/* eslint-disable no-undef */
const { app, BrowserWindow } = require("electron");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

let nextProcess = null;
let mainWindow = null;
const isDev = process.env.NODE_ENV === "development";

function startNextServer() {
  if (isDev) {
    console.log("Development: Using Next.js dev server");
    return;
  }

  console.log("Production: Starting Next.js standalone server...");

  // Path to the standalone server
  const standalonePath = path.join(
    process.resourcesPath,
    // "app.asar.unpacked",
    "standalone",
  );

  // Check if standalone server exists
  if (!fs.existsSync(path.join(standalonePath, "/apps/web/server.js"))) {
    console.error("Standalone server not found at:", standalonePath);
    return;
  }

  // Set environment variables
  const env = {
    ...process.env,
    PORT: "3000",
    NODE_ENV: "production",
    ELECTRON: "true",
  };

  // Start Next.js server
  nextProcess = spawn("node", [path.join(standalonePath, "/apps/web/server.js")], {
    env,
    cwd: standalonePath,
    stdio: "pipe",
  });

  nextProcess.stdout.on("data", (data) => {
    const output = data.toString();
    console.log(`Next.js: ${output}`);

    // When server is ready, load the page
    if (output.includes("started server") || output.includes("Ready on")) {
      if (mainWindow) {
        console.log("Loading URL: http://localhost:3000");
        mainWindow.loadURL("http://localhost:3000");
      }
    }
  });

  nextProcess.stderr.on("data", (data) => {
    console.error(`Next.js error: ${data.toString()}`);
  });

  nextProcess.on("close", (code) => {
    console.log(`Next.js process exited with code ${code}`);
  });

  // Fallback: If server doesn't signal ready within 10 seconds
  setTimeout(() => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      console.log("Fallback: Loading URL after timeout");
      mainWindow.loadURL("http://localhost:3000");
    }
  }, 10000);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    show: false, // Don't show until page is ready
  });

  // Show window when content is loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (isDev) {
    // Development: Connect to Next.js dev server
    console.log("Loading development URL: http://localhost:3000");
    mainWindow.loadURL("http://localhost:3000");

    // Only open DevTools if explicitly requested
    if (openDevTools) {
      mainWindow.webContents.openDevTools();
    }
  }
  else {
    // Production: Start Next.js server first
    startNextServer();
  }

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith("http://localhost") && !url.startsWith("file://")) {
      require("electron").shell.openExternal(url);
      return { action: "deny" };
    }
    return { action: "allow" };
  });

  // Log navigation events
  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription) => {
      console.error("Failed to load:", errorCode, errorDescription);
    },
  );

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Page loaded successfully");
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("before-quit", () => {
  console.log("App quitting, cleaning up Next.js process...");
  if (nextProcess) {
    nextProcess.kill();
  }
});
