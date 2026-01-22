import { BrowserWindow } from "electron";
import { NextServerManager } from "./nextServerManager";
import { appConfig, isLinux, isPackaged } from "/@/constants/";

async function createWindow() {
  const browserWindow = new BrowserWindow({
    // Use 'ready-to-show' event to show window
    show: false,
    webPreferences: {
      // https://www.electronjs.org/docs/latest/api/webview-tag#warning
      webviewTag: false,
      sandbox: !isLinux,
      spellcheck: false,
      preload: appConfig.preloadFilePath,
      // Important for Next.js routing
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  /**
   * @see https://github.com/electron/electron/issues/25012
   */
  browserWindow.on("ready-to-show", () => {
    browserWindow?.show();

    if (!isPackaged) {
      browserWindow?.webContents.openDevTools({ mode: "detach" });
    }
  });

  // Start Next.js server and load URL
  const serverManager = NextServerManager.getInstance();

  try {
    if (isPackaged) {
      console.log("Starting Next.js standalone server...");
      await serverManager.startServer();

      // Wait for server to initialize
      const isReady = await serverManager.waitForServerReady();
      if (!isReady) {
        throw new Error("Next.js server failed to start");
      }
    }

    await browserWindow.loadURL(appConfig.webBaseURL);
  } catch (error) {
    console.error("Failed to load Next.js app:", error);

    browserWindow.loadURL(`data:text/html;charset=utf-8,
        <html><body>
          <h1>Failed to load Next.js app</h1>
          <p>${error}</p>
          <p>Make sure Next.js dev server is running on port ${appConfig.webBaseURL}</p>
        </body></html>`);
  }

  return browserWindow;
}

let mainWindow: BrowserWindow | undefined;

/**
 * Restore an existing window or create a new one if necessary
 */
export async function restoreOrCreateWindow() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    mainWindow = await createWindow();
  }

  if (mainWindow.isMinimized()) {
    mainWindow.restore();
  }

  mainWindow.setSkipTaskbar(false);
  mainWindow.setAlwaysOnTop(true);
  mainWindow.show();
  mainWindow.focus();
  mainWindow.setAlwaysOnTop(false);
}

/** Get the main window instance */
export function getMainWindow() {
  return mainWindow;
}

/** Clean up when app is closing */
export function cleanupWindows() {
  const serverManager = NextServerManager.getInstance();
  serverManager.stopServer();

  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.close();
  }
}
