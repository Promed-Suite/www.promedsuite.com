import { app, BrowserWindow, protocol } from "electron";
import { createHandler } from "next-electron-rsc";
import path from "node:path";
import { appConfig, isLinux, isPackaged } from "/@/constants/";

let stopIntercept;

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

  const appPath = app.getAppPath();
  const dev = process.env.NODE_ENV === "development";
  const dir = path.join(appPath, "dist", "web/apps/web/");

  console.log("APP", appPath);

  const { createInterceptor, localhostUrl } = createHandler({
    dev,
    dir,
    protocol,
    debug: true,
    turbo: true,
  });

  stopIntercept = await createInterceptor({
    session: browserWindow.webContents.session,
  });

  browserWindow.on("close", () => {
    stopIntercept?.();
  });

  // await browserWindow.loadURL(`https://mxlinux.org/mx-linux-blog/`);
  await browserWindow.loadURL(appConfig.webBaseURL);

  console.log("[APP] Loaded", localhostUrl);

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

export { stopIntercept };
