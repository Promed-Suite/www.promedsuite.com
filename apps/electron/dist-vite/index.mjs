import L, { app as n, dialog as N, BrowserWindow as b, Tray as M, Menu as j, nativeTheme as O, shell as $, session as V, net as q } from "electron";
import U, { join as h } from "node:path";
import { parseArgs as R } from "node:util";
import { setTimeout as _ } from "node:timers/promises";
import B from "electron-store";
import H from "electron-updater";
import { existsSync as z } from "node:fs";
import { readdir as G, stat as Q, rm as J } from "node:fs/promises";
import { format as K } from "date-fns";
import d from "electron-log/main.js";
globalThis.__dirname ||= import.meta.dirname;
n.isPackaged || (n.getVersion = () => "0.1.0");
N.showErrorBox = function(e, t) {
  console.error(`Error logged without system dialog: ${e}
${t}`);
};
process.on("uncaughtException", (e) => {
  console.error("Uncaught exception:", e);
});
process.on("unhandledRejection", (e) => {
  console.error("Unhandled promise rejection:", e);
});
const S = n.isPackaged, g = R({
  options: {
    /** Log level */
    "app-log-level": {
      type: "string",
      default: S ? "info" : "silly"
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
}).values;
g["app-log-level"];
const X = g["app-env"] ? g["app-env"] === "dev" : !1;
g["app-env"] && g["app-env"];
process.platform;
process.platform;
const Y = process.platform === "linux", k = n.getPath("sessionData"), m = {
  /** Application data root directory */
  sessionDir: k,
  /** System locale */
  lang: n.getLocale(),
  /** Temporary files directory */
  tempDir: h(k, "temp"),
  /** Application logs directory */
  logsDir: n.getPath("logs"),
  /** Configuration file */
  configFile: h(k, "config.json"),
  /** Preload script file path */
  get preloadFilePath() {
    return S ? h(import.meta.dirname, "./preload/index.cjs") : h(import.meta.dirname, "../../preload/dist/index.cjs");
  },
  /** Web resource base URL */
  // get webBaseURL() {
  //   return !isPackaged && import.meta.env.VITE_DEV_SERVER_URL !== undefined
  //     ? import.meta.env.VITE_DEV_SERVER_URL
  //     : `file://${join(import.meta.dirname, './web/index.html')}`
  // },
  get webBaseURL() {
    return "http://localhost:3000";
  }
};
console.debug("appConfig", m);
const u = X ? "bqy-dev" : "bqy", P = "bqy-media";
let s, l;
const Z = 1e3, ee = 20, te = Z / ee;
async function oe() {
  s = new b({
    width: 500,
    height: 500,
    frame: !1,
    transparent: !0,
    hasShadow: !0,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1,
      webSecurity: !1
    }
  });
  try {
    await s.loadFile(
      U.join(import.meta.dirname, "../resources/loading.html")
    );
  } catch (e) {
    throw console.error("Failed to load loading screen:", e), s = null, e;
  }
  return s.on("closed", () => {
    s = null;
  }), s;
}
async function ne() {
  const e = new b({
    width: 1366,
    height: 768,
    show: !1,
    // Hide until ready
    autoHideMenuBar: !0,
    webPreferences: {
      webviewTag: !1,
      sandbox: !Y,
      spellcheck: !1,
      preload: m.preloadFilePath,
      nodeIntegration: !1,
      contextIsolation: !0
    }
  });
  return e.loadURL(
    "https://www-promedsuite-com-web.vercel.app/"
  ).catch((o) => {
    throw console.error("Failed to load main window:", o), s && !s.isDestroyed() && (s.webContents.send(
      "loading-error",
      `Failed to load app: ${o.message}`
    ), setTimeout(() => {
      s && !s.isDestroyed() && s.close();
    }, 3e3)), o;
  }), e.once("ready-to-show", () => {
    se(), e.show(), S || e.webContents.openDevTools({ mode: "detach" });
  }), e.on("closed", () => {
    l = void 0;
  }), e.webContents.on("did-fail-load", (o, r, a, c) => {
    console.log("Failed to load:", c, a);
  }), e.webContents.on("did-navigate-in-page", (o, r, a) => {
    console.log("Navigated in page to:", r, a);
  }), e;
}
function se() {
  if (s && !s.isDestroyed()) {
    let e = 1;
    const t = setInterval(() => {
      s && !s.isDestroyed() ? (e -= 0.05, e <= 0 ? (clearInterval(t), s.close()) : s.setOpacity(e)) : clearInterval(t);
    }, te);
  }
}
async function D() {
  if (l && !l.isDestroyed())
    return l.isMinimized() && l.restore(), l.setSkipTaskbar(!1), l.setAlwaysOnTop(!0), l.show(), l.focus(), l.setAlwaysOnTop(!1), l;
  try {
    return await oe(), l = await ne(), l;
  } catch (e) {
    throw console.error("Failed to create windows:", e), s && !s.isDestroyed() && s.close(), e;
  }
}
function f() {
  return l;
}
let p;
async function ae() {
  if (await _(), p)
    return p.setContextMenu(I()), p;
  const e = U.join(import.meta.dirname, "..", "resources/tray.png");
  return p = new M(e), p.setToolTip(n.getName()), p.setContextMenu(I()), p.on("click", () => {
    f()?.show(), f()?.setSkipTaskbar(!1);
  }), p;
}
function I() {
  return j.buildFromTemplate([
    {
      label: "show",
      click: () => {
        f()?.show();
      }
    },
    {
      label: "exit",
      click: () => {
        p.destroy(), f()?.destroy();
      }
    }
  ]);
}
var C = {}, F;
function re() {
  return F || (F = 1, (function(e) {
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    const t = L;
    class o {
      channel;
      listeners = {};
      constructor(a = "IPC-bridge") {
        this.channel = a, this.bindMessage();
      }
      on(a, c) {
        if (this.listeners[a]) throw new Error(`Handler for message ${String(a)} already exists`);
        this.listeners[a] = c;
      }
      off(a) {
        this.listeners[a] && delete this.listeners[a];
      }
      async send(a, ...c) {
        t.BrowserWindow.getAllWindows().forEach((v) => {
          v.webContents.send(this.channel, { name: a, payload: c });
        });
      }
      bindMessage() {
        t.ipcMain.handle(this.channel, this.handleReceivingMessage.bind(this));
      }
      async handleReceivingMessage(a, c) {
        try {
          if (this.listeners[c.name]) return { type: "success", result: await this.listeners[c.name](a, ...c.payload) };
          throw new Error(`Unknown IPC message ${String(c.name)}`);
        } catch (v) {
          return { type: "error", error: v.toString() };
        }
      }
    }
    e.IPCMain = o;
  })(C)), C;
}
var ie = re();
const le = {
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
}, T = new B({
  schema: le,
  clearInvalidConfig: !0
}), { autoUpdater: i } = H, E = h(import.meta.dirname, "../dev-app-update.yml"), ce = ["checking", "available", "downloading", "downloaded", "not-available", "error"];
class de {
  state = { status: "idle" };
  updateDownloaded = !1;
  checkingPromise = null;
  devConfigEnabled;
  listeners = /* @__PURE__ */ new Set();
  constructor() {
    this.devConfigEnabled = !n.isPackaged && z(E), this.devConfigEnabled && (i.forceDevUpdateConfig = !0, i.updateConfigPath = E), i.autoDownload = !0, i.autoInstallOnAppQuit = !1, i.fullChangelog = !0, i.logger = console, i.on("checking-for-update", () => {
      this.setState({ status: "checking", error: void 0 });
    }), i.on("update-available", (t) => {
      this.updateDownloaded = !1, this.setState({ status: "available", info: t, progress: void 0 });
    }), i.on("update-not-available", (t) => {
      this.updateDownloaded = !1, this.setState({ status: "not-available", info: t, progress: void 0 });
    }), i.on("error", (t) => {
      const o = t instanceof Error ? t.message : String(t);
      this.updateDownloaded = !1, this.setState({ status: "error", error: o, progress: void 0 });
    }), i.on("download-progress", (t) => {
      this.setState({ status: "downloading", progress: t });
    }), i.on("update-downloaded", (t) => {
      this.updateDownloaded = !0, this.setState({ status: "downloaded", info: t, progress: void 0 });
    });
  }
  /** Manually trigger an update check */
  async checkForUpdates() {
    return this.canCheckUpdates() ? this.checkingPromise ? this.checkingPromise : (this.checkingPromise = i.checkForUpdates().then((t) => (t?.updateInfo && this.isNewerVersion(t.updateInfo.version) ? this.setState({ status: "available", info: t.updateInfo }) : this.setState({ status: "not-available", info: t?.updateInfo, progress: void 0 }), this.state)).catch((t) => {
      const o = t instanceof Error ? t.message : String(t);
      return this.setState({ status: "error", error: o, progress: void 0 }), this.state;
    }).finally(() => {
      this.checkingPromise = null;
    }), this.checkingPromise) : (this.setState({ status: "error", error: "No update feed configured for the current runtime", progress: void 0 }), this.state);
  }
  /** Get the latest known update state */
  getState() {
    return this.state;
  }
  /** Subscribe to updater state changes */
  onStateChange(t) {
    return this.listeners.add(t), () => {
      this.listeners.delete(t);
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
    this.updateDownloaded || await i.downloadUpdate(), i.quitAndInstall(!1, !0);
  }
  canCheckUpdates() {
    return n.isPackaged || this.devConfigEnabled;
  }
  isNewerVersion(t) {
    try {
      const o = n.getVersion();
      return this.normalizeVersion(t) > this.normalizeVersion(o);
    } catch {
      return t !== n.getVersion();
    }
  }
  normalizeVersion(t) {
    return Number(t.split(".").map((o) => o.padStart(2, "0")).join(""));
  }
  setState(t) {
    const o = t.status && ce.includes(t.status);
    this.state = {
      ...this.state,
      ...t,
      checkedAt: o ? Date.now() : this.state.checkedAt
    }, this.emitState();
  }
  emitState() {
    for (const t of this.listeners)
      t(this.state);
  }
}
const w = new de();
class pe {
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
const x = new pe();
function ue(e) {
  const t = w.onStateChange((o) => {
    e.send("app:updateState", o);
  });
  n.once("before-quit", () => {
    t();
  }), e.on("app:getAppVersion", (o) => n.getVersion()), e.on("app:setSystemTheme", (o, r) => {
    O.themeSource = r;
  }), e.on("app:saveSoftConfig", (o, r) => {
    Object.assign(T.store, r);
  }), e.on("app:getSoftConfig", (o) => ({ ...T })), e.on("app:checkForUpdates", (o) => w.checkForUpdates()), e.on("app:getUpdateState", () => w.getState()), e.on("app:checkWebForUpdates", (o) => x.checkForUpdates()), e.on("app:hasUpdate", (o) => w.hasUpdate()), e.on("app:quitAndInstall", async (o, r) => {
    r.type === "app" ? w.upgradeNow() : r.type === "web" && await x.upgradeNow();
  }), e.on("app:showLogDir", (o) => {
    $.openPath(m.logsDir);
  }), e.on("app:showHideTrafficLight", (o, r) => {
    f()?.setWindowButtonVisibility?.(r);
  }), e.on("app:isMainWindow", (o) => f()?.id === b.fromWebContents(o.sender)?.id), e.on("app:showCurrentWebviewWindow", (o) => {
    b.fromWebContents(o.sender)?.show();
  }), e.on("app:getGPUFeatureStatus", (o) => n.getGPUFeatureStatus());
}
function he(e) {
  ue(e);
}
const y = new ie.IPCMain();
function fe() {
  he(y);
}
n.commandLine.appendSwitch("experimental-network-inspection");
!S && n.commandLine.appendSwitch("ignore-connections-limit", "localhost");
n.on("open-url", async (e, t) => {
  e.preventDefault(), await A(t, "open-url");
});
async function ge() {
  n.removeAsDefaultProtocolClient(u), process.defaultApp ? process.argv.length >= 2 && n.setAsDefaultProtocolClient(u, process.execPath, [
    U.resolve(process.argv[1])
  ]) : n.setAsDefaultProtocolClient(u), n.on("second-instance", async (e, t) => {
    console.log("commandLine", t), await D(), await A(t.at(-1) || "", "second-instance");
  }), n.on("web-contents-created", (e, t) => {
    t.setWindowOpenHandler(({ url: o }) => ($.openExternal(o), { action: "deny" }));
  }), n.on("window-all-closed", () => {
    process.platform !== "darwin" && (console.log("All windows was closed. Quit app."), n.quit());
  }), n.on("activate", () => D());
  try {
    await n.whenReady(), we(), await D(), ae(), await me(), console.log("setupApp done");
  } catch (e) {
    console.error("Failed create window:", e);
  }
}
function we(e = V.defaultSession.protocol) {
  e.isProtocolHandled(P) || e.handle(P, (t) => {
    const o = t.url.slice(`${P}:`.length);
    return console.debug("protocol handle", o), q.fetch(o);
  });
}
async function me() {
  try {
    const e = process.argv.find(
      (t) => t.startsWith(`${u}://`)
    );
    e && await A(e, "cold-start");
  } catch (e) {
    console.error("Failed to handle protocol on cold start:", e);
  }
}
async function A(e, t) {
  try {
    if (!e || !e.startsWith(`${u}://`)) return;
    console.log(`deep-link [${t}]:`, e);
    const o = e.split("?")[1];
    e.includes(`${u}://oauth2callback`) && (y.send("oauth2:google-callback", `?${o}`), console.log("oauth2callback:", t, e)), e.includes(`${u}://inviteUser2project`) && (y.send("invite:to-project", `?${o}`), console.log("inviteUser2project:", t, e)), e.includes(`${u}://open-page`) && (y.send("open:page", `?${o}`), console.log("open-page:", t, e)), f()?.show?.();
  } catch (o) {
    console.error("Failed to dispatch deep link:", t, o);
  }
}
function ve() {
  d.transports.console.format = "[{y}-{m}-{d} {h}:{i}:{s}] [{level}] {text}", d.transports.file.format = `[{y}-{m}-{d} {h}:{i}:{s}] [{level}][${n.getVersion()}] {text}`, d.transports.console.useStyles = !0, d.transports.file.level = g["app-log-level"], d.transports.file.sync = !1, d.transports.file.resolvePathFn = () => {
    const e = K(Date.now(), "yyyy-MM-dd");
    return h(m.logsDir, `${e}.log`);
  }, Object.assign(console, d.functions), d.errorHandler.startCatching(), ye();
}
async function ye() {
  const e = m.logsDir;
  try {
    const t = await G(e), o = Date.now();
    t.forEach(async (r) => {
      const a = h(e, r), c = await Q(a);
      o - c.mtimeMs > 10080 * 60 * 1e3 && J(a, { recursive: !0, force: !0 }).then(() => {
        d.info(`Deleted expired log file: ${r}`);
      }).catch((W) => {
        d.error(`Failed to delete file: ${r}`, W);
      });
    });
  } catch (t) {
    d.error("Failed to read log directory:", t);
  }
}
async function be() {
  ve(), fe(), await ge();
}
const Se = n.requestSingleInstanceLock();
Se || (n.quit(), process.exit(0));
be();
