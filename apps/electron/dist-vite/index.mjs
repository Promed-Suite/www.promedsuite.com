import { app as o, dialog as F, BrowserWindow as k, Tray as L, Menu as W, ipcMain as M, nativeTheme as O, shell as T, session as V, net as q } from "electron";
import j, { join as h } from "node:path";
import { spawn as B } from "node:child_process";
import { existsSync as I } from "node:fs";
import { parseArgs as H } from "node:util";
import { setTimeout as z } from "node:timers/promises";
import G from "electron-store";
import Q from "electron-updater";
import { readdir as _, stat as J, rm as K } from "node:fs/promises";
import { format as X } from "date-fns";
import l from "electron-log/main.js";
globalThis.__dirname ||= import.meta.dirname;
o.isPackaged || (o.getVersion = () => "0.0.1");
F.showErrorBox = function(t, e) {
  console.error(`Error logged without system dialog: ${t}
${e}`);
};
process.on("uncaughtException", (t) => {
  console.error("Uncaught exception:", t);
});
process.on("unhandledRejection", (t) => {
  console.error("Unhandled promise rejection:", t);
});
const y = o.isPackaged, S = (() => {
  const e = H({
    options: {
      /** Log level */
      "app-log-level": {
        type: "string",
        default: y ? "info" : "silly"
        // Default: info
        // default: 'info',  // Default: info
      },
      /** Specify APP runtime environment (dev, prod). Default is empty, determined by env vars */
      "app-env": {
        type: "string",
        default: ""
      }
    },
    strict: !1
    // Default: true, throws on unknown options
  });
  return console.log("appCliStartArgs", e), e.values;
})();
S["app-log-level"];
const Y = S["app-env"] ? S["app-env"] === "dev" : !0;
S["app-env"] && S["app-env"];
process.platform;
process.platform;
const Z = process.platform === "linux", U = o.getPath("sessionData"), g = {
  /** Application data root directory */
  sessionDir: U,
  /** System locale */
  lang: o.getLocale(),
  /** Temporary files directory */
  tempDir: h(U, "temp"),
  /** Application logs directory */
  logsDir: o.getPath("logs"),
  /** Configuration file */
  configFile: h(U, "config.json"),
  /** Preload script file path */
  get preloadFilePath() {
    return y ? h(import.meta.dirname, "./preload/index.cjs") : h(import.meta.dirname, "../../preload/dist/index.cjs");
  },
  /** Web resource base URL */
  // get webBaseURL() {
  //   return !isPackaged && import.meta.env.VITE_DEV_SERVER_URL !== undefined
  //     ? import.meta.env.VITE_DEV_SERVER_URL
  //     : `file://${join(import.meta.dirname, './web/index.html')}`
  // },
  get webBaseURL() {
    return `file://${h(import.meta.dirname, "./web/apps/web/server.js")}`;
  }
};
console.debug("appConfig", g);
const f = Y ? "bqy-dev" : "bqy", C = "bqy-media";
class p {
  static instance;
  nextProcess = null;
  serverReady = !1;
  constructor() {
  }
  static getInstance() {
    return p.instance || (p.instance = new p()), p.instance;
  }
  /**
   * Start the Next.js server
   */
  async startServer() {
    if (this.nextProcess && !this.nextProcess.killed) {
      console.log("Next.js server is already running");
      return;
    }
    if (this.serverReady = !1, !y) {
      console.log(
        "Development mode: Assuming Next.js dev server is already running"
      ), this.serverReady = !0;
      return;
    }
    console.log("Production mode: Starting Next.js standalone server...");
    const e = o.getAppPath(), s = j.join(
      e,
      "dist",
      "web",
      "/apps/web/server.js"
    );
    if (console.log("Looking for server at:", s), !I(s))
      throw console.error("Next.js standalone server not found at:", s), new Error("Next.js standalone server not found");
    const r = {
      ...process.env,
      PORT: "3000",
      HOSTNAME: "localhost",
      ELECTRON: "true"
    };
    return new Promise((u, v) => {
      try {
        this.nextProcess = B("node", [s], {
          env: r,
          cwd: e,
          stdio: ["pipe"],
          detached: !1
        });
        let w = "", b = "";
        this.nextProcess.stdout?.on("data", (i) => {
          const c = i.toString();
          w += c, console.log(`Next.js: ${c.trim()}`), (c.includes("started server") || c.includes("Ready in")) && (this.serverReady = !0, console.log("Next.js server is ready!"), u());
        }), this.nextProcess.stderr?.on("data", (i) => {
          const c = i.toString();
          b += c, console.error(`Next.js error: ${c.trim()}`);
        }), this.nextProcess.on("close", (i) => {
          if (console.log(`Next.js process exited with code ${i}`), this.serverReady = !1, this.nextProcess = null, i !== 0 && i !== null) {
            const c = new Error(
              `Next.js server failed to start. Code: ${i}
Stdout: ${w}
Stderr: ${b}`
            );
            v(c);
          }
        }), this.nextProcess.on("error", (i) => {
          console.error("Failed to start Next.js process:", i), this.serverReady = !1, this.nextProcess = null, v(i);
        }), setTimeout(() => {
          if (!this.serverReady) {
            const i = new Error(
              `Next.js server startup timeout. Server logs:
Stdout: ${w}
Stderr: ${b}`
            );
            this.stopServer(), v(i);
          }
        }, 3e4);
      } catch (w) {
        console.error("Error starting Next.js server:", w), v(w);
      }
    });
  }
  /** Stop the Next.js server */
  stopServer() {
    this.nextProcess && !this.nextProcess.killed && (console.log("Stopping Next.js server..."), this.nextProcess.kill("SIGTERM"), this.nextProcess = null, this.serverReady = !1);
  }
  /** Check if server is ready */
  isServerReady() {
    return this.serverReady;
  }
  /** Get the server URL */
  getServerUrl() {
    return g.webBaseURL;
  }
  /** Wait for server to be ready with retries */
  async waitForServerReady(e = 30, s = 1e3) {
    for (let r = 0; r < e; r++) {
      if (this.serverReady)
        return !0;
      await new Promise((u) => setTimeout(u, s));
    }
    return !1;
  }
}
async function ee() {
  const t = new k({
    // Use 'ready-to-show' event to show window
    show: !1,
    webPreferences: {
      // https://www.electronjs.org/docs/latest/api/webview-tag#warning
      webviewTag: !1,
      sandbox: !Z,
      spellcheck: !1,
      preload: g.preloadFilePath,
      // Important for Next.js routing
      nodeIntegration: !1,
      contextIsolation: !0
    }
  });
  t.on("ready-to-show", () => {
    t?.show(), y || t?.webContents.openDevTools({ mode: "detach" });
  });
  const e = p.getInstance();
  try {
    if (y && (console.log("Starting Next.js standalone server..."), await e.startServer(), !await e.waitForServerReady()))
      throw new Error("Next.js server failed to start");
    await t.loadURL(g.webBaseURL);
  } catch (s) {
    console.error("Failed to load Next.js app:", s), t.loadURL(`data:text/html;charset=utf-8,
        <html><body>
          <h1>Failed to load Next.js app</h1>
          <p>${s}</p>
          <p>Make sure Next.js dev server is running on port ${g.webBaseURL}</p>
        </body></html>`);
  }
  return t;
}
let a;
async function D() {
  (!a || a.isDestroyed()) && (a = await ee()), a.isMinimized() && a.restore(), a.setSkipTaskbar(!1), a.setAlwaysOnTop(!0), a.show(), a.focus(), a.setAlwaysOnTop(!1);
}
function m() {
  return a;
}
function te() {
  p.getInstance().stopServer(), a && !a.isDestroyed() && a.close();
}
let d;
async function se() {
  if (await z(), d)
    return d.setContextMenu(A()), d;
  const t = j.join(import.meta.dirname, "..", "resources/tray.png");
  return d = new L(t), d.setToolTip(o.getName()), d.setContextMenu(A()), d.on("click", () => {
    m()?.show(), m()?.setSkipTaskbar(!1);
  }), d;
}
function A() {
  return W.buildFromTemplate([
    {
      label: "show",
      click: () => {
        m()?.show();
      }
    },
    {
      label: "exit",
      click: () => {
        d.destroy(), m()?.destroy();
      }
    }
  ]);
}
class oe {
  channel;
  listeners = {};
  constructor(e = "IPC-bridge") {
    this.channel = e, this.bindMessage();
  }
  on(e, s) {
    if (this.listeners[e])
      throw new Error(`Handler for message ${String(e)} already exists`);
    this.listeners[e] = s;
  }
  off(e) {
    this.listeners[e] && delete this.listeners[e];
  }
  async send(e, ...s) {
    k.getAllWindows().forEach((u) => {
      u.webContents.send(this.channel, {
        name: e,
        payload: s
      });
    });
  }
  bindMessage() {
    M.handle(this.channel, this.handleReceivingMessage.bind(this));
  }
  async handleReceivingMessage(e, s) {
    try {
      if (this.listeners[s.name])
        return {
          type: "success",
          result: await this.listeners[s.name](
            e,
            ...s.payload
          )
        };
      throw new Error(`Unknown IPC message ${String(s.name)}`);
    } catch (r) {
      return {
        type: "error",
        error: r.toString()
      };
    }
  }
}
const re = {
  theme: {
    type: "string",
    enum: ["system", "light", "dark"],
    default: "system"
  },
  autoLaunch: {
    type: "boolean",
    default: !1
  },
  allowPrerelease: {
    type: "boolean",
    default: !1
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
}, $ = new G({
  schema: re,
  clearInvalidConfig: !0
}), { autoUpdater: n } = Q, R = h(import.meta.dirname, "../dev-app-update.yml"), ne = ["checking", "available", "downloading", "downloaded", "not-available", "error"];
class ae {
  state = { status: "idle" };
  updateDownloaded = !1;
  checkingPromise = null;
  devConfigEnabled;
  listeners = /* @__PURE__ */ new Set();
  constructor() {
    this.devConfigEnabled = !o.isPackaged && I(R), this.devConfigEnabled && (n.forceDevUpdateConfig = !0, n.updateConfigPath = R), n.autoDownload = !0, n.autoInstallOnAppQuit = !1, n.fullChangelog = !0, n.logger = console, n.on("checking-for-update", () => {
      this.setState({ status: "checking", error: void 0 });
    }), n.on("update-available", (e) => {
      this.updateDownloaded = !1, this.setState({ status: "available", info: e, progress: void 0 });
    }), n.on("update-not-available", (e) => {
      this.updateDownloaded = !1, this.setState({ status: "not-available", info: e, progress: void 0 });
    }), n.on("error", (e) => {
      const s = e instanceof Error ? e.message : String(e);
      this.updateDownloaded = !1, this.setState({ status: "error", error: s, progress: void 0 });
    }), n.on("download-progress", (e) => {
      this.setState({ status: "downloading", progress: e });
    }), n.on("update-downloaded", (e) => {
      this.updateDownloaded = !0, this.setState({ status: "downloaded", info: e, progress: void 0 });
    });
  }
  /** Manually trigger an update check */
  async checkForUpdates() {
    return this.canCheckUpdates() ? this.checkingPromise ? this.checkingPromise : (this.checkingPromise = n.checkForUpdates().then((e) => (e?.updateInfo && this.isNewerVersion(e.updateInfo.version) ? this.setState({ status: "available", info: e.updateInfo }) : this.setState({ status: "not-available", info: e?.updateInfo, progress: void 0 }), this.state)).catch((e) => {
      const s = e instanceof Error ? e.message : String(e);
      return this.setState({ status: "error", error: s, progress: void 0 }), this.state;
    }).finally(() => {
      this.checkingPromise = null;
    }), this.checkingPromise) : (this.setState({ status: "error", error: "No update feed configured for the current runtime", progress: void 0 }), this.state);
  }
  /** Get the latest known update state */
  getState() {
    return this.state;
  }
  /** Subscribe to updater state changes */
  onStateChange(e) {
    return this.listeners.add(e), () => {
      this.listeners.delete(e);
    };
  }
  /** Whether there is a downloadable update */
  hasUpdate() {
    return this.updateDownloaded ? !0 : this.state.info !== void 0 && this.isNewerVersion(this.state.info.version) && (this.state.status === "available" || this.state.status === "downloading");
  }
  /** Download (if necessary) and restart to install */
  async upgradeNow() {
    if (!this.hasUpdate())
      throw new Error("No update is currently available");
    this.updateDownloaded || await n.downloadUpdate(), n.quitAndInstall(!1, !0);
  }
  canCheckUpdates() {
    return o.isPackaged || this.devConfigEnabled;
  }
  isNewerVersion(e) {
    try {
      const s = o.getVersion();
      return this.normalizeVersion(e) > this.normalizeVersion(s);
    } catch {
      return e !== o.getVersion();
    }
  }
  normalizeVersion(e) {
    return Number(e.split(".").map((s) => s.padStart(2, "0")).join(""));
  }
  setState(e) {
    const s = e.status && ne.includes(e.status);
    this.state = {
      ...this.state,
      ...e,
      checkedAt: s ? Date.now() : this.state.checkedAt
    }, this.emitState();
  }
  emitState() {
    for (const e of this.listeners)
      e(this.state);
  }
}
const P = new ae();
class ie {
  state = { status: "idle" };
  async checkForUpdates() {
    return this.state = {
      status: "not-available",
      checkedAt: Date.now()
    }, this.state;
  }
  hasUpdate() {
    return !1;
  }
  async upgradeNow() {
  }
}
const E = new ie();
function le(t) {
  const e = P.onStateChange((s) => {
    t.send("app:updateState", s);
  });
  o.once("before-quit", () => {
    e();
  }), t.on("app:getAppVersion", (s) => o.getVersion()), t.on("app:setSystemTheme", (s, r) => {
    O.themeSource = r;
  }), t.on("app:saveSoftConfig", (s, r) => {
    Object.assign($.store, r);
  }), t.on("app:getSoftConfig", (s) => ({ ...$ })), t.on("app:checkForUpdates", (s) => P.checkForUpdates()), t.on("app:getUpdateState", () => P.getState()), t.on("app:checkWebForUpdates", (s) => E.checkForUpdates()), t.on("app:hasUpdate", (s) => P.hasUpdate()), t.on("app:quitAndInstall", async (s, r) => {
    r.type === "app" ? P.upgradeNow() : r.type === "web" && await E.upgradeNow();
  }), t.on("app:showLogDir", (s) => {
    T.openPath(g.logsDir);
  }), t.on("app:showHideTrafficLight", (s, r) => {
    m()?.setWindowButtonVisibility?.(r);
  }), t.on("app:isMainWindow", (s) => m()?.id === k.fromWebContents(s.sender)?.id), t.on("app:showCurrentWebviewWindow", (s) => {
    k.fromWebContents(s.sender)?.show();
  }), t.on("app:getGPUFeatureStatus", (s) => o.getGPUFeatureStatus());
}
function ce(t) {
  le(t);
}
const x = new oe();
function de() {
  ce(x);
}
o.commandLine.appendSwitch("experimental-network-inspection");
!y && o.commandLine.appendSwitch("ignore-connections-limit", "localhost");
o.on("open-url", async (t, e) => {
  t.preventDefault(), await N(e, "open-url");
});
async function pe() {
  o.removeAsDefaultProtocolClient(f), process.defaultApp ? process.argv.length >= 2 && o.setAsDefaultProtocolClient(f, process.execPath, [
    j.resolve(process.argv[1])
  ]) : o.setAsDefaultProtocolClient(f), o.on("second-instance", async (t, e) => {
    console.log("commandLine", e), await D(), await N(e.at(-1) || "", "second-instance");
  }), o.on("web-contents-created", (t, e) => {
    e.setWindowOpenHandler(({ url: s }) => (T.openExternal(s), { action: "deny" }));
  }), o.on("window-all-closed", () => {
    p.getInstance().stopServer(), process.platform !== "darwin" && (console.log("All windows was closed. Quit app."), o.quit());
  }), o.on("before-quit", () => te()), o.on("quit", () => {
    p.getInstance().stopServer();
  }), o.on("activate", () => D());
  try {
    await o.whenReady(), ue(), await D(), se(), await he(), console.log("setupApp done");
  } catch (t) {
    console.error("Failed create window:", t);
  }
}
function ue(t = V.defaultSession.protocol) {
  t.isProtocolHandled(C) || t.handle(C, (e) => {
    const s = e.url.slice(`${C}:`.length);
    return console.debug("protocol handle", s), q.fetch(s);
  });
}
async function he() {
  try {
    const t = process.argv.find(
      (e) => e.startsWith(`${f}://`)
    );
    t && await N(t, "cold-start");
  } catch (t) {
    console.error("Failed to handle protocol on cold start:", t);
  }
}
async function N(t, e) {
  try {
    if (!t || !t.startsWith(`${f}://`)) return;
    console.log(`deep-link [${e}]:`, t);
    const s = t.split("?")[1];
    t.includes(`${f}://oauth2callback`) && (x.send("oauth2:google-callback", `?${s}`), console.log("oauth2callback:", e, t)), t.includes(`${f}://inviteUser2project`) && (x.send("invite:to-project", `?${s}`), console.log("inviteUser2project:", e, t)), t.includes(`${f}://open-page`) && (x.send("open:page", `?${s}`), console.log("open-page:", e, t)), m()?.show?.();
  } catch (s) {
    console.error("Failed to dispatch deep link:", e, s);
  }
}
function fe() {
  l.transports.console.format = "[{y}-{m}-{d} {h}:{i}:{s}] [{level}] {text}", l.transports.file.format = `[{y}-{m}-{d} {h}:{i}:{s}] [{level}][${o.getVersion()}] {text}`, l.transports.console.useStyles = !0, l.transports.file.level = S["app-log-level"], l.transports.file.sync = !1, l.transports.file.resolvePathFn = () => {
    const t = X(Date.now(), "yyyy-MM-dd");
    return h(g.logsDir, `${t}.log`);
  }, Object.assign(console, l.functions), l.errorHandler.startCatching(), ge();
}
async function ge() {
  const t = g.logsDir;
  try {
    const e = await _(t), s = Date.now();
    e.forEach(async (r) => {
      const u = h(t, r), v = await J(u);
      s - v.mtimeMs > 10080 * 60 * 1e3 && K(u, { recursive: !0, force: !0 }).then(() => {
        l.info(`Deleted expired log file: ${r}`);
      }).catch((b) => {
        l.error(`Failed to delete file: ${r}`, b);
      });
    });
  } catch (e) {
    l.error("Failed to read log directory:", e);
  }
}
async function we() {
  fe(), de(), await pe();
}
const me = o.requestSingleInstanceLock();
me || (o.quit(), process.exit(0));
we();
