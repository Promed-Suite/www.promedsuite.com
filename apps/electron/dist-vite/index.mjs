import require$$0, { app, dialog, BrowserWindow, Tray, Menu, nativeTheme, shell, session, net } from "electron";
import path, { join } from "node:path";
import { parseArgs } from "node:util";
import { setTimeout as setTimeout$1 } from "node:timers/promises";
import Store from "electron-store";
import electronUpdater from "electron-updater";
import { existsSync } from "node:fs";
import { readdir, stat, rm } from "node:fs/promises";
import { format } from "date-fns";
import log from "electron-log/main.js";
globalThis.__dirname ||= import.meta.dirname;
if (!app.isPackaged) {
  app.getVersion = () => "0.0.1";
}
dialog.showErrorBox = function(title, content) {
  console.error(`Error logged without system dialog: ${title}
${content}`);
};
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});
const isPackaged = app.isPackaged;
const appCliStartArgs = (() => {
  const options = {
    /** Log level */
    "app-log-level": {
      type: "string",
      default: isPackaged ? "info" : "silly"
      // Default: info
      // default: 'info',  // Default: info
    },
    /** Specify APP runtime environment (dev, prod). Default is empty, determined by env vars */
    "app-env": {
      type: "string",
      default: ""
    }
  };
  const args = parseArgs({
    options,
    strict: false
    // Default: true, throws on unknown options
  });
  return args.values;
})();
appCliStartArgs["app-log-level"] === "debug";
const isDev = appCliStartArgs["app-env"] ? appCliStartArgs["app-env"] === "dev" : false;
appCliStartArgs["app-env"] ? appCliStartArgs["app-env"] === "prod" : true;
process.platform === "darwin";
process.platform === "win32";
const isLinux = process.platform === "linux";
const sessionDir = app.getPath("sessionData");
const appConfig = {
  /** Application data root directory */
  sessionDir,
  /** System locale */
  lang: app.getLocale(),
  /** Temporary files directory */
  tempDir: join(sessionDir, "temp"),
  /** Application logs directory */
  logsDir: app.getPath("logs"),
  /** Configuration file */
  configFile: join(sessionDir, "config.json"),
  /** Preload script file path */
  get preloadFilePath() {
    return isPackaged ? join(import.meta.dirname, "./preload/index.cjs") : join(import.meta.dirname, "../../preload/dist/index.cjs");
  },
  /** Web resource base URL */
  // get webBaseURL() {
  //   return !isPackaged && import.meta.env.VITE_DEV_SERVER_URL !== undefined
  //     ? import.meta.env.VITE_DEV_SERVER_URL
  //     : `file://${join(import.meta.dirname, './web/index.html')}`
  // },
  get webBaseURL() {
    return !isPackaged && true ? "http://localhost:3000" : `http://localhost:3000`;
  }
};
console.debug("appConfig", appConfig);
const appProtocolName = isDev ? "bqy-dev" : "bqy";
const mediaProtocolName = "bqy-media";
let loadingWindow;
let mainWindow;
const FADE_DURATION_MS = 1e3;
const FADE_STEPS = 20;
const FADE_INTERVAL = FADE_DURATION_MS / FADE_STEPS;
async function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    transparent: true,
    hasShadow: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });
  try {
    await loadingWindow.loadFile(
      path.join(import.meta.dirname, "../resources/loading.html")
    );
  } catch (err) {
    console.error("Failed to load loading screen:", err);
    loadingWindow = null;
    throw err;
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
    show: false,
    // Hide until ready
    webPreferences: {
      webviewTag: false,
      sandbox: !isLinux,
      spellcheck: false,
      preload: appConfig.preloadFilePath,
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  const loadPromise = browserWindow.loadURL(
    `https://www-promedsuite-com-web.vercel.app/`
  );
  loadPromise.catch((err) => {
    console.error("Failed to load main window:", err);
    if (loadingWindow && !loadingWindow.isDestroyed()) {
      loadingWindow.webContents.send(
        "loading-error",
        `Failed to load app: ${err.message}`
      );
      setTimeout(() => {
        if (loadingWindow && !loadingWindow.isDestroyed()) {
          loadingWindow.close();
        }
      }, 3e3);
    }
    throw err;
  });
  browserWindow.once("ready-to-show", () => {
    fadeOutLoadingScreen();
    browserWindow.show();
    if (!isPackaged) {
      browserWindow.webContents.openDevTools({ mode: "detach" });
    }
  });
  browserWindow.on("closed", () => {
    mainWindow = void 0;
  });
  browserWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
    console.log("Failed to load:", validatedURL, errorDescription);
  });
  browserWindow.webContents.on("did-navigate-in-page", (event, url, isMainFrame) => {
    console.log("Navigated in page to:", url, isMainFrame);
  });
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
        } else {
          loadingWindow.setOpacity(opacity);
        }
      } else {
        clearInterval(fadeInterval);
      }
    }, FADE_INTERVAL);
  }
}
async function restoreOrCreateWindow() {
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
  try {
    await createLoadingWindow();
    mainWindow = await createWindow();
    return mainWindow;
  } catch (error) {
    console.error("Failed to create windows:", error);
    if (loadingWindow && !loadingWindow.isDestroyed()) {
      loadingWindow.close();
    }
    throw error;
  }
}
function getMainWindow() {
  return mainWindow;
}
let tray;
async function createTray() {
  await setTimeout$1();
  if (tray) {
    tray.setContextMenu(createContextMenu());
    return tray;
  }
  const iconPath = path.join(import.meta.dirname, "..", "resources/tray.png");
  tray = new Tray(iconPath);
  tray.setToolTip(app.getName());
  tray.setContextMenu(createContextMenu());
  tray.on("click", () => {
    getMainWindow()?.show();
    getMainWindow()?.setSkipTaskbar(false);
  });
  return tray;
}
function createContextMenu() {
  return Menu.buildFromTemplate([
    {
      label: "show",
      click: () => {
        getMainWindow()?.show();
      }
    },
    {
      label: "exit",
      click: () => {
        tray.destroy();
        getMainWindow()?.destroy();
      }
    }
  ]);
}
var ipcMain$1 = {};
var hasRequiredIpcMain;
function requireIpcMain() {
  if (hasRequiredIpcMain) return ipcMain$1;
  hasRequiredIpcMain = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, Symbol.toStringTag, { value: "Module" });
    const electron = require$$0;
    class IPCMain {
      channel;
      listeners = {};
      constructor(channel = "IPC-bridge") {
        this.channel = channel;
        this.bindMessage();
      }
      on(name, fn) {
        if (this.listeners[name])
          throw new Error(`Handler for message ${String(name)} already exists`);
        this.listeners[name] = fn;
      }
      off(action) {
        if (this.listeners[action]) {
          delete this.listeners[action];
        }
      }
      async send(name, ...payload) {
        const windows = electron.BrowserWindow.getAllWindows();
        windows.forEach((window) => {
          window.webContents.send(this.channel, {
            name,
            payload
          });
        });
      }
      bindMessage() {
        electron.ipcMain.handle(this.channel, this.handleReceivingMessage.bind(this));
      }
      async handleReceivingMessage(event, payload) {
        try {
          if (this.listeners[payload.name]) {
            const res = await this.listeners[payload.name](
              event,
              ...payload.payload
            );
            return {
              type: "success",
              result: res
            };
          } else {
            throw new Error(`Unknown IPC message ${String(payload.name)}`);
          }
        } catch (e) {
          return {
            type: "error",
            error: e.toString()
          };
        }
      }
    }
    exports$1.IPCMain = IPCMain;
  })(ipcMain$1);
  return ipcMain$1;
}
var ipcMainExports = requireIpcMain();
const schema = {
  theme: {
    type: "string",
    enum: ["system", "light", "dark"],
    default: "system"
  },
  autoLaunch: {
    type: "boolean",
    default: false
  },
  allowPrerelease: {
    type: "boolean",
    default: false
  },
  downloadMirror: {
    anyOf: [{ type: "string" }, { type: "null" }]
  },
  lastCheckedAt: {
    anyOf: [{ type: "number" }, { type: "null" }]
  },
  downloadDir: {
    type: "string",
    default: ""
  }
};
const store = new Store({
  schema,
  clearInvalidConfig: true
});
const { autoUpdater } = electronUpdater;
const DEV_UPDATE_CONFIG = join(import.meta.dirname, "../dev-app-update.yml");
const TIMESTAMP_STATUSES = ["checking", "available", "downloading", "downloaded", "not-available", "error"];
class AppUpdater {
  state = { status: "idle" };
  updateDownloaded = false;
  checkingPromise = null;
  devConfigEnabled;
  listeners = /* @__PURE__ */ new Set();
  constructor() {
    this.devConfigEnabled = !app.isPackaged && existsSync(DEV_UPDATE_CONFIG);
    if (this.devConfigEnabled) {
      autoUpdater.forceDevUpdateConfig = true;
      autoUpdater.updateConfigPath = DEV_UPDATE_CONFIG;
    }
    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = false;
    autoUpdater.fullChangelog = true;
    autoUpdater.logger = console;
    autoUpdater.on("checking-for-update", () => {
      this.setState({ status: "checking", error: void 0 });
    });
    autoUpdater.on("update-available", (info) => {
      this.updateDownloaded = false;
      this.setState({ status: "available", info, progress: void 0 });
    });
    autoUpdater.on("update-not-available", (info) => {
      this.updateDownloaded = false;
      this.setState({ status: "not-available", info, progress: void 0 });
    });
    autoUpdater.on("error", (error) => {
      const message = error instanceof Error ? error.message : String(error);
      this.updateDownloaded = false;
      this.setState({ status: "error", error: message, progress: void 0 });
    });
    autoUpdater.on("download-progress", (progress) => {
      this.setState({ status: "downloading", progress });
    });
    autoUpdater.on("update-downloaded", (info) => {
      this.updateDownloaded = true;
      this.setState({ status: "downloaded", info, progress: void 0 });
    });
  }
  /** Manually trigger an update check */
  async checkForUpdates() {
    if (!this.canCheckUpdates()) {
      this.setState({ status: "error", error: "No update feed configured for the current runtime", progress: void 0 });
      return this.state;
    }
    if (this.checkingPromise) {
      return this.checkingPromise;
    }
    this.checkingPromise = autoUpdater.checkForUpdates().then((result) => {
      if (result?.updateInfo && this.isNewerVersion(result.updateInfo.version)) {
        this.setState({ status: "available", info: result.updateInfo });
      } else {
        this.setState({ status: "not-available", info: result?.updateInfo, progress: void 0 });
      }
      return this.state;
    }).catch((error) => {
      const message = error instanceof Error ? error.message : String(error);
      this.setState({ status: "error", error: message, progress: void 0 });
      return this.state;
    }).finally(() => {
      this.checkingPromise = null;
    });
    return this.checkingPromise;
  }
  /** Get the latest known update state */
  getState() {
    return this.state;
  }
  /** Subscribe to updater state changes */
  onStateChange(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
  /** Whether there is a downloadable update */
  hasUpdate() {
    if (this.updateDownloaded) {
      return true;
    }
    return this.state.info !== void 0 && this.isNewerVersion(this.state.info.version) && (this.state.status === "available" || this.state.status === "downloading");
  }
  /** Download (if necessary) and restart to install */
  async upgradeNow() {
    if (!this.hasUpdate()) {
      throw new Error("No update is currently available");
    }
    if (!this.updateDownloaded) {
      await autoUpdater.downloadUpdate();
    }
    autoUpdater.quitAndInstall(false, true);
  }
  canCheckUpdates() {
    return app.isPackaged || this.devConfigEnabled;
  }
  isNewerVersion(targetVersion) {
    try {
      const current = app.getVersion();
      return this.normalizeVersion(targetVersion) > this.normalizeVersion(current);
    } catch {
      return targetVersion !== app.getVersion();
    }
  }
  normalizeVersion(version) {
    return Number(version.split(".").map((part) => part.padStart(2, "0")).join(""));
  }
  setState(partial) {
    const shouldStamp = partial.status && TIMESTAMP_STATUSES.includes(partial.status);
    this.state = {
      ...this.state,
      ...partial,
      checkedAt: shouldStamp ? Date.now() : this.state.checkedAt
    };
    this.emitState();
  }
  emitState() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}
const appUpdater = new AppUpdater();
class WebUpdater {
  state = { status: "idle" };
  async checkForUpdates() {
    this.state = {
      status: "not-available",
      checkedAt: Date.now()
    };
    return this.state;
  }
  hasUpdate() {
    return false;
  }
  async upgradeNow() {
  }
}
const webUpdater = new WebUpdater();
function setupAppIpc(ipcMain2) {
  const offUpdaterListener = appUpdater.onStateChange((state) => {
    void ipcMain2.send("app:updateState", state);
  });
  app.once("before-quit", () => {
    offUpdaterListener();
  });
  ipcMain2.on("app:getAppVersion", (event) => {
    return app.getVersion();
  });
  ipcMain2.on("app:setSystemTheme", (event, theme) => {
    nativeTheme.themeSource = theme;
  });
  ipcMain2.on("app:saveSoftConfig", (event, config) => {
    Object.assign(store.store, config);
  });
  ipcMain2.on("app:getSoftConfig", (event) => {
    return { ...store };
  });
  ipcMain2.on("app:checkForUpdates", (event) => {
    return appUpdater.checkForUpdates();
  });
  ipcMain2.on("app:getUpdateState", () => {
    return appUpdater.getState();
  });
  ipcMain2.on("app:checkWebForUpdates", (event) => {
    return webUpdater.checkForUpdates();
  });
  ipcMain2.on("app:hasUpdate", (event) => {
    return appUpdater.hasUpdate();
  });
  ipcMain2.on("app:quitAndInstall", async (event, info) => {
    if (info.type === "app") {
      appUpdater.upgradeNow();
    } else if (info.type === "web") {
      await webUpdater.upgradeNow();
    }
  });
  ipcMain2.on("app:showLogDir", (event) => {
    shell.openPath(appConfig.logsDir);
  });
  ipcMain2.on("app:showHideTrafficLight", (event, show) => {
    getMainWindow()?.setWindowButtonVisibility?.(show);
  });
  ipcMain2.on("app:isMainWindow", (event) => {
    return getMainWindow()?.id === BrowserWindow.fromWebContents(event.sender)?.id;
  });
  ipcMain2.on("app:showCurrentWebviewWindow", (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    win?.show();
  });
  ipcMain2.on("app:getGPUFeatureStatus", (event) => {
    return app.getGPUFeatureStatus();
  });
}
function setupIpcModules(ipcMain2) {
  setupAppIpc(ipcMain2);
}
const ipcMain = new ipcMainExports.IPCMain();
function setupIpc() {
  setupIpcModules(ipcMain);
}
app.commandLine.appendSwitch("experimental-network-inspection");
!isPackaged && app.commandLine.appendSwitch("ignore-connections-limit", "localhost");
app.on("open-url", async (event, url) => {
  event.preventDefault();
  await dispatchDeepLink(url, "open-url");
});
async function setupApp() {
  app.removeAsDefaultProtocolClient(appProtocolName);
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(appProtocolName, process.execPath, [
        path.resolve(process.argv[1])
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient(appProtocolName);
  }
  app.on("second-instance", async (event, commandLine) => {
    console.log("commandLine", commandLine);
    await restoreOrCreateWindow();
    await dispatchDeepLink(commandLine.at(-1) || "", "second-instance");
  });
  app.on("web-contents-created", (e, webContents) => {
    webContents.setWindowOpenHandler(({ url }) => {
      shell.openExternal(url);
      return { action: "deny" };
    });
  });
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      console.log("All windows was closed. Quit app.");
      app.quit();
    }
  });
  app.on("activate", () => restoreOrCreateWindow());
  try {
    await app.whenReady();
    handleCustomProtocol();
    await restoreOrCreateWindow();
    createTray();
    await handleColdStart();
    console.log("setupApp done");
  } catch (error) {
    console.error("Failed create window:", error);
  }
}
function handleCustomProtocol(protocol = session.defaultSession.protocol) {
  if (protocol.isProtocolHandled(mediaProtocolName)) {
    return;
  }
  protocol.handle(mediaProtocolName, (request) => {
    const filePath = request.url.slice(`${mediaProtocolName}:`.length);
    console.debug("protocol handle", filePath);
    return net.fetch(filePath);
  });
}
async function handleColdStart() {
  try {
    const startupUrl = process.argv.find(
      (arg) => arg.startsWith(`${appProtocolName}://`)
    );
    if (startupUrl) {
      await dispatchDeepLink(startupUrl, "cold-start");
    }
  } catch (error) {
    console.error("Failed to handle protocol on cold start:", error);
  }
}
async function dispatchDeepLink(url, source) {
  try {
    if (!url || !url.startsWith(`${appProtocolName}://`)) return;
    console.log(`deep-link [${source}]:`, url);
    const searchParams = url.split("?")[1];
    if (url.includes(`${appProtocolName}://oauth2callback`)) {
      ipcMain.send("oauth2:google-callback", `?${searchParams}`);
      console.log("oauth2callback:", source, url);
    }
    if (url.includes(`${appProtocolName}://inviteUser2project`)) {
      ipcMain.send("invite:to-project", `?${searchParams}`);
      console.log("inviteUser2project:", source, url);
    }
    if (url.includes(`${appProtocolName}://open-page`)) {
      ipcMain.send("open:page", `?${searchParams}`);
      console.log("open-page:", source, url);
    }
    getMainWindow()?.show?.();
  } catch (error) {
    console.error("Failed to dispatch deep link:", source, error);
  }
}
function setupLog() {
  log.transports.console.format = `[{y}-{m}-{d} {h}:{i}:{s}] [{level}] {text}`;
  log.transports.file.format = `[{y}-{m}-{d} {h}:{i}:{s}] [{level}][${app.getVersion()}] {text}`;
  log.transports.console.useStyles = true;
  log.transports.file.level = appCliStartArgs["app-log-level"];
  log.transports.file.sync = false;
  log.transports.file.resolvePathFn = () => {
    const formattedDate = format(Date.now(), "yyyy-MM-dd");
    return join(appConfig.logsDir, `${formattedDate}.log`);
  };
  Object.assign(console, log.functions);
  log.errorHandler.startCatching();
  cleanupOldLogs();
}
async function cleanupOldLogs() {
  const logDir = appConfig.logsDir;
  try {
    const files = await readdir(logDir);
    const now = Date.now();
    files.forEach(async (file) => {
      const filePath = join(logDir, file);
      const stats = await stat(filePath);
      const fileAge = now - stats.mtimeMs;
      if (fileAge > 7 * 24 * 60 * 60 * 1e3) {
        rm(filePath, { recursive: true, force: true }).then(() => {
          log.info(`Deleted expired log file: ${file}`);
        }).catch((err) => {
          log.error(`Failed to delete file: ${file}`, err);
        });
      }
    });
  } catch (error) {
    log.error("Failed to read log directory:", error);
  }
}
async function setupModules() {
  setupLog();
  setupIpc();
  await setupApp();
}
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
  process.exit(0);
}
setupModules();
