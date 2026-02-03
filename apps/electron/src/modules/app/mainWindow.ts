import { BrowserWindow, ipcMain } from "electron";
import path from "node:path";

import { appConfig, isLinux, isPackaged } from "/@/constants/";

let stopIntercept;
let loadingWindow: BrowserWindow | null;
let mainWindow: BrowserWindow | undefined;

// Loading screen fade animation duration
const FADE_DURATION_MS = 1000; // 1 second fade
const FADE_STEPS = 20; // 20 steps for smooth animation
const FADE_INTERVAL = FADE_DURATION_MS / FADE_STEPS; // 50ms per step

export async function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    transparent: true,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  try {
    await loadingWindow.loadFile(
      path.join(import.meta.dirname, "../resources/loading.html"),
    );
  }
  catch (err) {
    console.error("Failed to load loading screen:", err);
    loadingWindow = null;
    throw err; // Re-throw to handle in caller
  }

  loadingWindow.on("closed", () => {
    loadingWindow = null;
  });

  return loadingWindow;
}

async function createWindow() {
  const browserWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    show: false, // Hide until ready
    autoHideMenuBar: true,
    webPreferences: {
      webviewTag: false,
      sandbox: !isLinux,
      spellcheck: false,
      preload: appConfig.preloadFilePath,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Handle main window loading
  const loadPromise = browserWindow.loadURL(
    `https://www-promedsuite-com-web.vercel.app/`,
  );

  // Handle loading errors
  loadPromise.catch((err) => {
    console.error("Failed to load main window:", err);
    if (loadingWindow && !loadingWindow.isDestroyed()) {
      loadingWindow.webContents.send(
        "loading-error",
        `Failed to load app: ${err.message}`,
      );
      // Keep loading window open for a bit to show error
      setTimeout(() => {
        if (loadingWindow && !loadingWindow.isDestroyed()) {
          loadingWindow.close();
        }
      }, 3000);
    }
    // Don't quit here, let the app handle it
    throw err;
  });

  // When main window is ready, fade out loading screen and show main window
  browserWindow.once("ready-to-show", () => {
    fadeOutLoadingScreen();
    browserWindow.show();

    if (!isPackaged) {
      browserWindow.webContents.openDevTools({ mode: "detach" });
    }
  });

  browserWindow.on("closed", () => {
    mainWindow = undefined;
  });

  //
  browserWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
    console.log("Failed to load:", validatedURL, errorDescription);
  });

  browserWindow.webContents.on("did-navigate-in-page", (event, url, isMainFrame) => {
    console.log("Navigated in page to:", url, isMainFrame);
  });
  //

  return browserWindow;
}

function fadeOutLoadingScreen() {
  if (loadingWindow && !loadingWindow.isDestroyed()) {
    let opacity = 1;
    const fadeInterval = setInterval(() => {
      if (loadingWindow && !loadingWindow.isDestroyed()) {
        opacity -= 0.05;
        if (opacity <= 0) {
          clearInterval(fadeInterval);
          loadingWindow.close();
        }
        else {
          loadingWindow.setOpacity(opacity);
        }
      }
      else {
        clearInterval(fadeInterval);
      }
    }, FADE_INTERVAL);
  }
}

/**
 * Restore an existing window or create a new one if necessary
 */
export async function restoreOrCreateWindow() {
  // Don't create if we already have a valid window
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.setSkipTaskbar(false);
    mainWindow.setAlwaysOnTop(true);
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setAlwaysOnTop(false);
    return mainWindow;
  }

  // Create new window with loading screen
  try {
    // Create and show loading window first
    await createLoadingWindow();

    // Create main window (hidden initially)
    mainWindow = await createWindow();

    return mainWindow;
  }
  catch (error) {
    console.error("Failed to create windows:", error);
    // Close loading window if it exists
    if (loadingWindow && !loadingWindow.isDestroyed()) {
      loadingWindow.close();
    }
    throw error;
  }
}

/** Get the main window instance */
export function getMainWindow() {
  return mainWindow;
}

/** Get the loading window instance (for IPC) */
export function getLoadingWindow() {
  return loadingWindow;
}

// IPC handlers for loading screen communication
export function setupLoadingScreenIPC() {
  ipcMain.on("loading-message", (event, message) => {
    if (loadingWindow && !loadingWindow.isDestroyed()) {
      loadingWindow.webContents.send("loading-message", message);
    }
  });

  ipcMain.on("loading-error", (event, error) => {
    if (loadingWindow && !loadingWindow.isDestroyed()) {
      loadingWindow.webContents.send("loading-error", error);
    }
  });
}

export { stopIntercept };
